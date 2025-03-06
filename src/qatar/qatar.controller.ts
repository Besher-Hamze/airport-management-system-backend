import { 
    Controller, 
    Get, 
    Post, 
    Put, 
    Delete, 
    Body, 
    Param, 
    HttpStatus, 
    HttpCode
  } from '@nestjs/common';
  import { 
    ApiTags, 
    ApiOperation, 
    ApiResponse, 
    ApiParam, 
    ApiBody 
  } from '@nestjs/swagger';
  import { QatarService } from './qatar.service';
  import { 
    CreateFlightDto, 
    UpdateFlightDto, 
    CreateBookingDto, 
    UpdateBookingStatusDto 
  } from './dto/qatar.dto';
  import { Flight } from './entities/flight.entity';
  import { Booking } from './entities/booking.entity';
  
  @ApiTags('qatar-airport')
  @Controller('airports/qatar')
  export class QatarController {
    constructor(private readonly qatarService: QatarService) {}
  
    // Flight Endpoints
    @Get('flights')
    @ApiOperation({ summary: 'Get all flights' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Return all flights' })
    async getAllFlights(): Promise<Flight[]> {
      return this.qatarService.getAllFlights();
    }
  
    @Get('flights/:id')
    @ApiOperation({ summary: 'Get flight by ID' })
    @ApiParam({ name: 'id', description: 'Flight ID' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Return flight by ID' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Flight not found' })
    async getFlightById(@Param('id') id: string): Promise<Flight> {
      return this.qatarService.getFlightById(id);
    }
  
    @Get('flights/number/:number')
    @ApiOperation({ summary: 'Get flight by number' })
    @ApiParam({ name: 'number', description: 'Flight number' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Return flight by number' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Flight not found' })
    async getFlightByNumber(@Param('number') number: string): Promise<Flight> {
      return this.qatarService.getFlightByNumber(number);
    }
  
    @Post('flights')
    @ApiOperation({ summary: 'Create a new flight' })
    @ApiBody({ type: CreateFlightDto })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'Flight created successfully' })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
    async createFlight(@Body() createFlightDto: CreateFlightDto): Promise<Flight> {
      return this.qatarService.createFlight(createFlightDto);
    }
  
    @Put('flights/:id')
    @ApiOperation({ summary: 'Update flight by ID' })
    @ApiParam({ name: 'id', description: 'Flight ID' })
    @ApiBody({ type: UpdateFlightDto })
    @ApiResponse({ status: HttpStatus.OK, description: 'Flight updated successfully' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Flight not found' })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
    async updateFlight(
      @Param('id') id: string,
      @Body() updateFlightDto: UpdateFlightDto,
    ): Promise<Flight> {
      return this.qatarService.updateFlight(id, updateFlightDto);
    }
  
    @Delete('flights/:id')
    @ApiOperation({ summary: 'Delete flight by ID' })
    @ApiParam({ name: 'id', description: 'Flight ID' })
    @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Flight deleted successfully' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Flight not found' })
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteFlight(@Param('id') id: string): Promise<void> {
      return this.qatarService.deleteFlight(id);
    }
  
    // Booking Endpoints
    @Get('bookings')
    @ApiOperation({ summary: 'Get all bookings' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Return all bookings' })
    async getAllBookings(): Promise<Booking[]> {
      return this.qatarService.getAllBookings();
    }
  
    @Get('bookings/:id')
    @ApiOperation({ summary: 'Get booking by ID' })
    @ApiParam({ name: 'id', description: 'Booking ID' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Return booking by ID' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Booking not found' })
    async getBookingById(@Param('id') id: string): Promise<Booking> {
      return this.qatarService.getBookingById(id);
    }
  
    @Get('bookings/number/:number')
    @ApiOperation({ summary: 'Get booking by number' })
    @ApiParam({ name: 'number', description: 'Booking number' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Return booking by number' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Booking not found' })
    async getBookingByNumber(@Param('number') number: string): Promise<Booking> {
      return this.qatarService.getBookingByNumber(number);
    }
  
    @Post('bookings')
    @ApiOperation({ summary: 'Create a new booking' })
    @ApiBody({ type: CreateBookingDto })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'Booking created successfully' })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Flight not found' })
    async createBooking(@Body() createBookingDto: CreateBookingDto): Promise<Booking> {
      return this.qatarService.createBooking(createBookingDto);
    }
  
    @Put('bookings/:id/status')
    @ApiOperation({ summary: 'Update booking status' })
    @ApiParam({ name: 'id', description: 'Booking ID' })
    @ApiBody({ type: UpdateBookingStatusDto })
    @ApiResponse({ status: HttpStatus.OK, description: 'Booking status updated successfully' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Booking not found' })
    async updateBookingStatus(
      @Param('id') id: string,
      @Body() updateStatusDto: UpdateBookingStatusDto,
    ): Promise<Booking> {
      return this.qatarService.updateBookingStatus(id, updateStatusDto);
    }
  
    @Delete('bookings/:id/cancel')
    @ApiOperation({ summary: 'Cancel booking' })
    @ApiParam({ name: 'id', description: 'Booking ID' })
    @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Booking cancelled successfully' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Booking not found' })
    @HttpCode(HttpStatus.NO_CONTENT)
    async cancelBooking(@Param('id') id: string): Promise<void> {
      return this.qatarService.cancelBooking(id);
    }
  
    @Get('flights/:id/bookings')
    @ApiOperation({ summary: 'Get all bookings for a flight' })
    @ApiParam({ name: 'id', description: 'Flight ID' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Return all bookings for a flight' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Flight not found' })
    async getBookingsByFlight(@Param('id') id: string): Promise<Booking[]> {
      return this.qatarService.getBookingsByFlight(id);
    }
  }