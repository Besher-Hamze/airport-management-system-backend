import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmiratesController } from './emirates.controller';
import { EmiratesService } from './emirates.service';
import { Flight } from './entities/flight.entity';
import { Booking } from './entities/booking.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Flight, Booking], 'emirates'),
  ],
  controllers: [EmiratesController],
  providers: [EmiratesService],
  exports: [EmiratesService],
})
export class EmiratesModule {}