import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QatarController } from './qatar.controller';
import { QatarService } from './qatar.service';
import { Flight } from './entities/flight.entity';
import { Booking } from './entities/booking.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Flight, Booking], 'qatar'),
  ],
  controllers: [QatarController],
  providers: [QatarService],
  exports: [QatarService],
})
export class QatarModule {}