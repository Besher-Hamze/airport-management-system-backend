import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Flight, FlightDocument } from './schemas/flight.schema';
import { Booking, BookingDocument } from './schemas/booking.schema';
import { CreateFlightDto, UpdateFlightDto, CreateBookingDto, UpdateBookingStatusDto } from './dto/sham.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ShamService {
  constructor(
    @InjectModel(Flight.name, 'sham') private flightModel: Model<FlightDocument>,
    @InjectModel(Booking.name, 'sham') private bookingModel: Model<BookingDocument>
  ) {
    // Seed initial flights if none exist
    this.seedInitialFlights();
  }

  async seedInitialFlights(): Promise<void> {
    const count = await this.flightModel.countDocuments();
    if (count === 0) {
      const initialFlights: CreateFlightDto[] = [
        {
          number: 'SHA101',
          from: 'دمشق',
          to: 'دبي',
          departureTime: '09:30',
          arrivalTime: '11:45',
          baggageAllowance: 30,
          price: 350,
          date: '2025-03-10',
          gate: 'A12',
        },
        {
          number: 'SHA202',
          from: 'دمشق',
          to: 'القاهرة',
          departureTime: '14:15',
          arrivalTime: '16:00',
          baggageAllowance: 30,
          price: 280,
          date: '2025-03-12',
          gate: 'B05',
        },
        {
          number: 'SHA303',
          from: 'دمشق',
          to: 'إسطنبول',
          departureTime: '18:45',
          arrivalTime: '20:30',
          baggageAllowance: 30,
          price: 420,
          date: '2025-03-15',
          gate: 'C08',
        }
      ];

      await Promise.all(initialFlights.map(flight => this.createFlight(flight)));
      console.log('Seeded initial flights for Sham Airport');
    }
  }

  // Flight Operations
  async getAllFlights(): Promise<Flight[]> {
    return this.flightModel.find().exec();
  }

  async getFlightById(id: string): Promise<Flight> {
    try {
      const objectId = new Types.ObjectId(id);
      const flight = await this.flightModel.findById(objectId).exec();
      if (!flight) {
        throw new NotFoundException(`Flight with ID ${id} not found`);
      }
      return flight;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Invalid flight ID format');
    }
  }

  async getFlightByNumber(number: string): Promise<Flight> {
    const flight = await this.flightModel.findOne({ number }).exec();
    if (!flight) {
      throw new NotFoundException(`Flight with number ${number} not found`);
    }
    return flight;
  }

  async createFlight(createFlightDto: CreateFlightDto): Promise<Flight> {
    const exists = await this.flightModel.findOne({ number: createFlightDto.number }).exec();
    if (exists) {
      throw new BadRequestException(`Flight with number ${createFlightDto.number} already exists`);
    }
    
    const createdFlight = new this.flightModel(createFlightDto);
    return createdFlight.save();
  }

  async updateFlight(id: string, updateFlightDto: UpdateFlightDto): Promise<Flight> {
    try {
      const objectId = new Types.ObjectId(id);
      const existingFlight = await this.flightModel.findById(objectId).exec();
      
      if (!existingFlight) {
        throw new NotFoundException(`Flight with ID ${id} not found`);
      }
      
      if (updateFlightDto.number && updateFlightDto.number !== existingFlight.number) {
        const numberExists = await this.flightModel.findOne({ 
          number: updateFlightDto.number,
          _id: { $ne: objectId }
        }).exec();
        
        if (numberExists) {
          throw new BadRequestException(`Flight with number ${updateFlightDto.number} already exists`);
        }
      }
      
      return this.flightModel.findByIdAndUpdate(objectId, updateFlightDto, { new: true }).exec();
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Invalid flight ID format');
    }
  }

  async deleteFlight(id: string): Promise<void> {
    try {
      const objectId = new Types.ObjectId(id);
      const result = await this.flightModel.deleteOne({ _id: objectId }).exec();
      
      if (result.deletedCount === 0) {
        throw new NotFoundException(`Flight with ID ${id} not found`);
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Invalid flight ID format');
    }
  }

  // Booking Operations
  async getAllBookings(): Promise<Booking[]> {
    return this.bookingModel.find().populate('flight').exec();
  }

  async getBookingById(id: string): Promise<Booking> {
    try {
      const objectId = new Types.ObjectId(id);
      const booking = await this.bookingModel.findById(objectId).populate('flight').exec();
      
      if (!booking) {
        throw new NotFoundException(`Booking with ID ${id} not found`);
      }
      
      return booking;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Invalid booking ID format');
    }
  }

  async getBookingByNumber(bookingNumber: string): Promise<Booking> {
    const booking = await this.bookingModel.findOne({ bookingNumber }).populate('flight').exec();
    
    if (!booking) {
      throw new NotFoundException(`Booking with number ${bookingNumber} not found`);
    }
    
    return booking;
  }

  async createBooking(createBookingDto: CreateBookingDto): Promise<Booking> {
    try {
      const flightId = new Types.ObjectId(createBookingDto.flightId);
      const flight = await this.flightModel.findById(flightId).exec();
      
      if (!flight) {
        throw new NotFoundException(`Flight with ID ${createBookingDto.flightId} not found`);
      }
      
      // Check if seat is already occupied
      if (flight.occupiedSeats.includes(createBookingDto.seat)) {
        throw new BadRequestException(`Seat ${createBookingDto.seat} is already occupied`);
      }
      
      // Generate a unique booking number
      const bookingNumber = `SHA-${uuidv4().substring(0, 7).toUpperCase()}`;
      
      // Create the booking
      const createdBooking = new this.bookingModel({
        ...createBookingDto,
        bookingNumber,
        flight: flightId,
      });
      
      const savedBooking = await createdBooking.save();
      
      // Update the flight's occupied seats
      await this.flightModel.findByIdAndUpdate(flightId, {
        $push: { occupiedSeats: createBookingDto.seat }
      });
      
      return savedBooking;
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Invalid flight ID format');
    }
  }

  async updateBookingStatus(id: string, updateStatusDto: UpdateBookingStatusDto): Promise<Booking> {
    try {
      const objectId = new Types.ObjectId(id);
      const booking = await this.bookingModel.findById(objectId).exec();
      
      if (!booking) {
        throw new NotFoundException(`Booking with ID ${id} not found`);
      }
      
      return this.bookingModel.findByIdAndUpdate(
        objectId,
        { status: updateStatusDto.status },
        { new: true }
      ).populate('flight').exec();
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Invalid booking ID format');
    }
  }

  async cancelBooking(id: string): Promise<void> {
    try {
      const objectId = new Types.ObjectId(id);
      const booking = await this.bookingModel.findById(objectId).exec();
      
      if (!booking) {
        throw new NotFoundException(`Booking with ID ${id} not found`);
      }
      
      // Remove seat from flight's occupied seats
      await this.flightModel.findByIdAndUpdate(booking.flight, {
        $pull: { occupiedSeats: booking.seat }
      });
      
      // Update booking status to cancelled
      await this.bookingModel.findByIdAndUpdate(objectId, { status: 'cancelled' });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Invalid booking ID format');
    }
  }

  async getBookingsByFlight(flightId: string): Promise<Booking[]> {
    try {
      const objectId = new Types.ObjectId(flightId);
      const flight = await this.flightModel.findById(objectId).exec();
      
      if (!flight) {
        throw new NotFoundException(`Flight with ID ${flightId} not found`);
      }
      
      return this.bookingModel.find({ flight: objectId }).populate('flight').exec();
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Invalid flight ID format');
    }
  }
}