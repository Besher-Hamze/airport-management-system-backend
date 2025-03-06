import { 
    Controller, 
    Get, 
    Post, 
    Put, 
    Delete, 
    Body, 
    Param, 
    HttpStatus, 
    HttpCode, 
    Query 
  } from '@nestjs/common';
  import { 
    ApiTags, 
    ApiOperation, 
    ApiResponse, 
    ApiParam, 
    ApiBody 
  } from '@nestjs/swagger';
  import { ShamService } from './sham.service';
  import { 
    CreateFlightDto, 
    UpdateFlightDto, 
    CreateBookingDto, 
    UpdateBookingStatusDto 
  } from './dto/sham.dto';
  import { Flight } from './schemas/flight.schema';
  import { Booking } from './schemas/booking.schema';
  
  @ApiTags('sham-airport')
  @Controller('airports/sham')
  export class ShamController {
    constructor(private readonly shamService: ShamService) {}
  
    // Flight Endpoints
    @Get('flights')
    @ApiOperation({ summary: 'Get all flights' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Return all flights' })
    async getAllFlights(): Promise<Flight[]> {
      return this.shamService.getAllFlights();
    }
  
    @Get('flights/:id')
    @ApiOperation({ summary: 'Get flight by ID' })
    @ApiParam({ name: 'id', description: 'Flight ID' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Return flight by ID' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Flight not found' })
    async getFlightById(@Param('id') id: string): Promise<Flight> {
      return this.shamService.getFlightById(id);
    }
  
    @Get('flights/number/:number')
    @ApiOperation({ summary: 'Get flight by number' })
    @ApiParam({ name: 'number', description: 'Flight number' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Return flight by number' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Flight not found' })
    async getFlightByNumber(@Param('number') number: string): Promise<Flight> {
      return this.shamService.getFlightByNumber(number);
    }
  
    @Post('flights')
    @ApiOperation({ summary: 'Create a new flight' })
    @ApiBody({ type: CreateFlightDto })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'Flight created successfully' })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
    async createFlight(@Body() createFlightDto: CreateFlightDto): Promise<Flight> {
      return this.shamService.createFlight(createFlightDto);
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
      return this.shamService.updateFlight(id, updateFlightDto);
    }
  
    @Delete('flights/:id')
    @ApiOperation({ summary: 'Delete flight by ID' })
    @ApiParam({ name: 'id', description: 'Flight ID' })
    @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Flight deleted successfully' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Flight not found' })
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteFlight(@Param('id') id: string): Promise<void> {
      return this.shamService.deleteFlight(id);
    }
  
    // Booking Endpoints
    @Get('bookings')
    @ApiOperation({ summary: 'Get all bookings' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Return all bookings' })
    async getAllBookings(): Promise<Booking[]> {
      return this.shamService.getAllBookings();
    }
  
    @Get('bookings/:id')
    @ApiOperation({ summary: 'Get booking by ID' })
    @ApiParam({ name: 'id', description: 'Booking ID' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Return booking by ID' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Booking not found' })
    async getBookingById(@Param('id') id: string): Promise<Booking> {
      return this.shamService.getBookingById(id);
    }
  
    @Get('bookings/number/:number')
    @ApiOperation({ summary: 'Get booking by number' })
    @ApiParam({ name: 'number', description: 'Booking number' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Return booking by number' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Booking not found' })
    async getBookingByNumber(@Param('number') number: string): Promise<Booking> {
      return this.shamService.getBookingByNumber(number);
    }
  
    @Post('bookings')
    @ApiOperation({ summary: 'Create a new booking' })
    @ApiBody({ type: CreateBookingDto })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'Booking created successfully' })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Flight not found' })
    async createBooking(@Body() createBookingDto: CreateBookingDto): Promise<Booking> {
      return this.shamService.createBooking(createBookingDto);
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
      return this.shamService.updateBookingStatus(id, updateStatusDto);
    }
  
    @Delete('bookings/:id/cancel')
    @ApiOperation({ summary: 'Cancel booking' })
    @ApiParam({ name: 'id', description: 'Booking ID' })
    @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Booking cancelled successfully' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Booking not found' })
    @HttpCode(HttpStatus.NO_CONTENT)
    async cancelBooking(@Param('id') id: string): Promise<void> {
      return this.shamService.cancelBooking(id);
    }
  
    @Get('flights/:id/bookings')
    @ApiOperation({ summary: 'Get all bookings for a flight' })
    @ApiParam({ name: 'id', description: 'Flight ID' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Return all bookings for a flight' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Flight not found' })
    async getBookingsByFlight(@Param('id') id: string): Promise<Booking[]> {
      return this.shamService.getBookingsByFlight(id);
    }
  }