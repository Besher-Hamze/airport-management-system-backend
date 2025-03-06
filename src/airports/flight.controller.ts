
import { Controller, Get, Post, Body, HttpStatus, UseGuards, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ShamService } from '../sham/sham.service';
import { EmiratesService } from '../emirates/emirates.service';
import { QatarService } from '../qatar/qatar.service';
import { CreateFlightDto as ShamCreateFlightDto } from '../sham/dto/sham.dto';
import { CreateFlightDto as EmiratesCreateFlightDto } from '../emirates/dto/emirates.dto';
import { CreateFlightDto as QatarCreateFlightDto } from '../qatar/dto/qatar.dto';

@ApiTags('flight-management')
@Controller('flight-management') 
export class FlightManagementController {
  constructor(
    private readonly shamService: ShamService,
    private readonly emiratesService: EmiratesService,
    private readonly qatarService: QatarService,
  ) {}

  // Get all flights from all airports
  @Get('flights')
  @ApiOperation({ summary: 'Get all flights from all airports' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Return all flights from all airports' })
  async getAllFlights() {
    try {
      // Get flights from all three airports in parallel
      const [shamFlights, emiratesFlights, qatarFlights] = await Promise.all([
        this.shamService.getAllFlights(),
        this.emiratesService.getAllFlights(),
        this.qatarService.getAllFlights(),
      ]);

      // Return flights with their airport information
      return {
        sham: shamFlights.map(flight => ({ ...flight, airport: 'sham' })),
        emirates: emiratesFlights.map(flight => ({ ...flight, airport: 'emirates' })),
        qatar: qatarFlights.map(flight => ({ ...flight, airport: 'qatar' })),
      };
    } catch (error) {
      console.error('Error fetching all flights:', error);
      throw error;
    }
  }

  // Get all flights for a specific airport
  @Get('flights/:airportId')
  @ApiOperation({ summary: 'Get all flights for a specific airport' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Return all flights for a specific airport' })
  async getAirportFlights(@Param('airportId') airportId: string) {
    switch (airportId) {
      case 'sham':
        return this.shamService.getAllFlights();
      case 'emirates':
        return this.emiratesService.getAllFlights();
      case 'qatar':
        return this.qatarService.getAllFlights();
      default:
        throw new Error(`Unknown airport: ${airportId}`);
    }
  }

  // Add a new flight to Sham airport
  @Post('flights/sham')
  // @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add a new flight to Sham airport' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Flight added successfully' })
  async addShamFlight(@Body() createFlightDto: ShamCreateFlightDto) {
    return this.shamService.createFlight(createFlightDto);
  }

  // Add a new flight to Emirates airport
  @Post('flights/emirates')
  // @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add a new flight to Emirates airport' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Flight added successfully' })
  async addEmiratesFlight(@Body() createFlightDto: EmiratesCreateFlightDto) {
    return this.emiratesService.createFlight(createFlightDto);
  }

  // Add a new flight to Qatar airport
  @Post('flights/qatar')
  // @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add a new flight to Qatar airport' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Flight added successfully' })
  async addQatarFlight(@Body() createFlightDto: QatarCreateFlightDto) {
    return this.qatarService.createFlight(createFlightDto);
  }
}