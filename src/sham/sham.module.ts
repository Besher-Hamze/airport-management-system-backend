import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ShamController } from './sham.controller';
import { ShamService } from './sham.service';
import { Flight, FlightSchema } from './schemas/flight.schema';
import { Booking, BookingSchema } from './schemas/booking.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: Flight.name, schema: FlightSchema },
        { name: Booking.name, schema: BookingSchema },
      ],
      'sham'
    ),
  ],
  controllers: [ShamController],
  providers: [ShamService],
  exports: [ShamService],
})
export class ShamModule {}