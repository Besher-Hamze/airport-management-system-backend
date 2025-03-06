import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { AirportsService } from './airports.service';
import { Airport } from './interfaces/airport.interface';

@ApiTags('airports')
@Controller('airports')
export class AirportsController {
  constructor(private readonly airportsService: AirportsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all airports' })
  @ApiResponse({ status: 200, description: 'Return all airports' })
  async getAllAirports(): Promise<Airport[]> {
    return this.airportsService.getAllAirports();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get airport by ID' })
  @ApiParam({ name: 'id', description: 'Airport ID' })
  @ApiResponse({ status: 200, description: 'Return airport by ID' })
  async getAirportById(@Param('id') id: string): Promise<Airport> {
    return this.airportsService.getAirportById(id);
  }

  @Get('dashboard/stats')
  @ApiOperation({ summary: 'Get dashboard statistics' })
  @ApiResponse({ status: 200, description: 'Return dashboard statistics' })
  async getDashboardData(): Promise<any> {
    return this.airportsService.getDashboardData();
  }

  @Get('search/flights')
  @ApiOperation({ summary: 'Search flights across all airports' })
  @ApiQuery({ name: 'from', required: false, description: 'Departure city' })
  @ApiQuery({ name: 'to', required: false, description: 'Arrival city' })
  @ApiQuery({ name: 'date', required: false, description: 'Flight date (YYYY-MM-DD)' })
  @ApiResponse({ status: 200, description: 'Return matching flights' })
  async searchFlights(
    @Query('from') from?: string,
    @Query('to') to?: string,
    @Query('date') date?: string,
  ): Promise<any[]> {
    return this.airportsService.searchFlights(from, to, date);
  }
}