import { Injectable, NotFoundException, BadRequestException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Flight } from './entities/flight.entity';
import { Booking } from './entities/booking.entity';
import { CreateFlightDto, UpdateFlightDto, CreateBookingDto, UpdateBookingStatusDto } from './dto/qatar.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class QatarService implements OnModuleInit {
  constructor(
    @InjectRepository(Flight, 'qatar')
    private flightRepository: Repository<Flight>,
    
    @InjectRepository(Booking, 'qatar')
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
          number: 'QTA101',
          from: 'الدوحة',
          to: 'نيويورك',
          departureTime: '09:30',
          arrivalTime: '16:45',
          baggageAllowance: 35,
          price: 950,
          date: '2025-03-10',
          gate: 'A12',
          occupiedSeats: [],
        },
        {
          number: 'QTA202',
          from: 'الدوحة',
          to: 'لندن',
          departureTime: '14:15',
          arrivalTime: '19:30',
          baggageAllowance: 30,
          price: 580,
          date: '2025-03-12',
          gate: 'B05',
          occupiedSeats: [],
        },
        {
          number: 'QTA303',
          from: 'الدوحة',
          to: 'سيدني',
          departureTime: '21:45',
          arrivalTime: '17:30',
          baggageAllowance: 40,
          price: 1180,
          date: '2025-03-15',
          gate: 'C08',
          occupiedSeats: [],
        }
      ];

      for (const flight of initialFlights) {
        await this.createFlight(flight);
      }
      
      console.log('Seeded initial flights for Qatar Airport');
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

    // Convert array to string for MySQL simple-array type
    const occupiedSeatsString = createFlightDto.occupiedSeats ? createFlightDto.occupiedSeats.join(',') : '';
    
    const flight = this.flightRepository.create({
      ...createFlightDto,
      occupiedSeats: occupiedSeatsString
    });
    
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
    
    // Handle occupiedSeats array conversion if it exists in the DTO
    if (updateFlightDto.occupiedSeats) {
      const occupiedSeatsString = updateFlightDto.occupiedSeats.join(',');
      Object.assign(flight, { ...updateFlightDto, occupiedSeats: occupiedSeatsString });
    } else {
      Object.assign(flight, updateFlightDto);
    }
    
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
    
    // Parse occupiedSeats string to array for checking
    const occupiedSeats = flight.occupiedSeats ? flight.occupiedSeats.split(',').filter(Boolean) : [];
    
    // Check if seat is already occupied
    if (occupiedSeats.includes(createBookingDto.seat)) {
      throw new BadRequestException(`Seat ${createBookingDto.seat} is already occupied`);
    }
    
    // Generate a unique booking number
    const bookingNumber = `QTA-${uuidv4().substring(0, 7).toUpperCase()}`;
    
    // Create booking
    const booking = this.bookingRepository.create({
      ...createBookingDto,
      bookingNumber,
    });
    
    const savedBooking = await this.bookingRepository.save(booking);
    
    // Update flight's occupied seats
    occupiedSeats.push(createBookingDto.seat);
    flight.occupiedSeats = occupiedSeats.join(',');
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
    
    if (flight) {
      const occupiedSeats = flight.occupiedSeats.split(',').filter(Boolean);
      flight.occupiedSeats = occupiedSeats.filter(seat => seat !== booking.seat).join(',');
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