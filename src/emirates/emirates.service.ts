import { Injectable, NotFoundException, BadRequestException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Flight } from './entities/flight.entity';
import { Booking } from './entities/booking.entity';
import { CreateFlightDto, UpdateFlightDto, CreateBookingDto, UpdateBookingStatusDto } from './dto/emirates.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class EmiratesService implements OnModuleInit {
  constructor(
    @InjectRepository(Flight, 'emirates')
    private flightRepository: Repository<Flight>,
    
    @InjectRepository(Booking, 'emirates')
    private bookingRepository: Repository<Booking>
  ) {}

  async onModuleInit() {
    // Seed initial flights if none exist
    await this.seedInitialFlights();
  }

  async seedInitialFlights(): Promise<void> {
    const count = await this.flightRepository.count();
    if (count === 0) {
      const initialFlights: CreateFlightDto[] = [
        {
          number: 'EMA101',
          from: 'دبي',
          to: 'لندن',
          departureTime: '09:30',
          arrivalTime: '13:45',
          baggageAllowance: 35,
          price: 650,
          date: '2025-03-10',
          gate: 'A12',
        },
        {
          number: 'EMA202',
          from: 'دبي',
          to: 'باريس',
          departureTime: '14:15',
          arrivalTime: '18:30',
          baggageAllowance: 30,
          price: 580,
          date: '2025-03-12',
          gate: 'B05',
        },
        {
          number: 'EMA303',
          from: 'دبي',
          to: 'نيويورك',
          departureTime: '20:45',
          arrivalTime: '06:30',
          baggageAllowance: 40,
          price: 980,
          date: '2025-03-15',
          gate: 'C08',
        }
      ];

      await Promise.all(initialFlights.map(flight => this.createFlight(flight)));
      console.log('Seeded initial flights for Emirates Airport');
    }
  }

  // Flight Operations
  async getAllFlights(): Promise<Flight[]> {
    return this.flightRepository.find();
  }

  async getFlightById(id: string): Promise<Flight> {
    const flight = await this.flightRepository.findOne({ where: { id } });
    
    if (!flight) {
      throw new NotFoundException(`Flight with ID ${id} not found`);
    }
    
    return flight;
  }

  async getFlightByNumber(number: string): Promise<Flight> {
    const flight = await this.flightRepository.findOne({ where: { number } });
    
    if (!flight) {
      throw new NotFoundException(`Flight with number ${number} not found`);
    }
    
    return flight;
  }

  async createFlight(createFlightDto: CreateFlightDto): Promise<Flight> {
    const existingFlight = await this.flightRepository.findOne({
      where: { number: createFlightDto.number }
    });

    if (existingFlight) {
      throw new BadRequestException(`Flight with number ${createFlightDto.number} already exists`);
    }

    const flight = this.flightRepository.create(createFlightDto);
    return this.flightRepository.save(flight);
  }

  async updateFlight(id: string, updateFlightDto: UpdateFlightDto): Promise<Flight> {
    const flight = await this.getFlightById(id);
    
    if (updateFlightDto.number && updateFlightDto.number !== flight.number) {
      const existingFlight = await this.flightRepository.findOne({
        where: { number: updateFlightDto.number }
      });
      
      if (existingFlight) {
        throw new BadRequestException(`Flight with number ${updateFlightDto.number} already exists`);
      }
    }
    
    Object.assign(flight, updateFlightDto);
    return this.flightRepository.save(flight);
  }

  async deleteFlight(id: string): Promise<void> {
    const result = await this.flightRepository.delete(id);
    
    if (result.affected === 0) {
      throw new NotFoundException(`Flight with ID ${id} not found`);
    }
  }

  // Booking Operations
  async getAllBookings(): Promise<Booking[]> {
    return this.bookingRepository.find({ relations: ['flight'] });
  }

  async getBookingById(id: string): Promise<Booking> {
    const booking = await this.bookingRepository.findOne({
      where: { id },
      relations: ['flight']
    });
    
    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }
    
    return booking;
  }

  async getBookingByNumber(bookingNumber: string): Promise<Booking> {
    const booking = await this.bookingRepository.findOne({
      where: { bookingNumber },
      relations: ['flight']
    });
    
    if (!booking) {
      throw new NotFoundException(`Booking with number ${bookingNumber} not found`);
    }
    
    return booking;
  }

  async createBooking(createBookingDto: CreateBookingDto): Promise<Booking> {
    const flight = await this.flightRepository.findOne({
      where: { id: createBookingDto.flightId }
    });
    
    if (!flight) {
      throw new NotFoundException(`Flight with ID ${createBookingDto.flightId} not found`);
    }
    
    // Check if seat is already occupied
    if (flight.occupiedSeats && flight.occupiedSeats.includes(createBookingDto.seat)) {
      throw new BadRequestException(`Seat ${createBookingDto.seat} is already occupied`);
    }
    
    // Generate a unique booking number
    const bookingNumber = `EMA-${uuidv4().substring(0, 7).toUpperCase()}`;
    
    // Create booking
    const booking = this.bookingRepository.create({
      ...createBookingDto,
      bookingNumber,
    });
    
    const savedBooking = await this.bookingRepository.save(booking);
    
    // Update flight's occupied seats
    if (!flight.occupiedSeats) {
      flight.occupiedSeats = [];
    }
    
    flight.occupiedSeats.push(createBookingDto.seat);
    await this.flightRepository.save(flight);
    
    return this.getBookingById(savedBooking.id);
  }

  async updateBookingStatus(id: string, updateStatusDto: UpdateBookingStatusDto): Promise<Booking> {
    const booking = await this.getBookingById(id);
    booking.status = updateStatusDto.status;
    
    return this.bookingRepository.save(booking);
  }

  async cancelBooking(id: string): Promise<void> {
    const booking = await this.getBookingById(id);
    
    // Update flight's occupied seats
    const flight = await this.flightRepository.findOne({
      where: { id: booking.flightId }
    });
    
    if (flight && flight.occupiedSeats) {
      flight.occupiedSeats = flight.occupiedSeats.filter(seat => seat !== booking.seat);
      await this.flightRepository.save(flight);
    }
    
    // Update booking status
    booking.status = 'cancelled';
    await this.bookingRepository.save(booking);
  }

  async getBookingsByFlight(flightId: string): Promise<Booking[]> {
    const flight = await this.flightRepository.findOne({
      where: { id: flightId }
    });
    
    if (!flight) {
      throw new NotFoundException(`Flight with ID ${flightId} not found`);
    }
    
    return this.bookingRepository.find({
      where: { flightId },
      relations: ['flight']
    });
  }
}