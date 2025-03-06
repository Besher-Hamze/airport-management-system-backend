// import { 
//     Controller, 
//     Get, 
//     Post, 
//     Delete, 
//     Body, 
//     Param, 
//     UseGuards,
//     Request,
//     Put
//   } from '@nestjs/common';
//   import { 
//     ApiTags, 
//     ApiOperation, 
//     ApiResponse, 
//     ApiBearerAuth 
//   } from '@nestjs/swagger';
//   import { UsersService } from './users.service';
//   import { User } from './schemas/user.schema';
// import { AddFavoriteAirportDto, UpdateUserDto } from './dto/auth.dto';
  
//   @ApiTags('users')
//   @Controller('users')
//   export class UsersController {
//     constructor(private readonly usersService: UsersService) {}
  
//     @Get('profile')
//     // @UseGuards(JwtAuthGuard)
//     @ApiBearerAuth()
//     @ApiOperation({ summary: 'Get current user profile' })
//     @ApiResponse({ status: 200, description: 'Return user profile' })
//     async getProfile(@Request() req): Promise<User> {
//       return this.usersService.findOne(req.user.userId);
//     }
  
//     @Put('profile')
//     @UseGuards(JwtAuthGuard)
//     @ApiBearerAuth()
//     @ApiOperation({ summary: 'Update user profile' })
//     @ApiResponse({ status: 200, description: 'Profile updated successfully' })
//     async updateProfile(
//       @Request() req,
//       @Body() updateUserDto: UpdateUserDto
//     ): Promise<User> {
//       return this.usersService.update(req.user.userId, updateUserDto);
//     }
  
//     @Post('favorites')
//     @UseGuards(JwtAuthGuard)
//     @ApiBearerAuth()
//     @ApiOperation({ summary: 'Add airport to favorites' })
//     @ApiResponse({ status: 200, description: 'Airport added to favorites' })
//     async addFavoriteAirport(
//       @Request() req,
//       @Body() addFavoriteDto: AddFavoriteAirportDto
//     ): Promise<User> {
//       return this.usersService.addFavoriteAirport(
//         req.user.userId,
//         addFavoriteDto.airportId
//       );
//     }
  
//     @Delete('favorites/:airportId')
//     @UseGuards(JwtAuthGuard)
//     @ApiBearerAuth()
//     @ApiOperation({ summary: 'Remove airport from favorites' })
//     @ApiResponse({ status: 200, description: 'Airport removed from favorites' })
//     async removeFavoriteAirport(
//       @Request() req,
//       @Param('airportId') airportId: string
//     ): Promise<User> {
//       return this.usersService.removeFavoriteAirport(req.user.userId, airportId);
//     }
  
//     @Post('search-history')
//     @UseGuards(JwtAuthGuard)
//     @ApiBearerAuth()
//     @ApiOperation({ summary: 'Add recent search' })
//     @ApiResponse({ status: 200, description: 'Search history updated' })
//     async addRecentSearch(
//       @Request() req,
//       @Body() searchData: { from: string; to: string; date: string }
//     ): Promise<User> {
//       return this.usersService.addRecentSearch(
//         req.user.userId,
//         searchData.from,
//         searchData.to,
//         searchData.date
//       );
//     }
//   }