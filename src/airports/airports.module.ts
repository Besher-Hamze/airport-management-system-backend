import { Module } from '@nestjs/common';
import { AirportsController } from './airports.controller';
import { AirportsService } from './airports.service';
import { ShamModule } from '../sham/sham.module';
import { EmiratesModule } from '../emirates/emirates.module';
import { QatarModule } from '../qatar/qatar.module';
import { FlightManagementController } from './flight.controller';

@Module({
  imports: [
    ShamModule,
    EmiratesModule,
    QatarModule,
  ],
  controllers: [AirportsController, FlightManagementController],
  providers: [AirportsService],
  exports: [AirportsService],
})
export class AirportsModule { }