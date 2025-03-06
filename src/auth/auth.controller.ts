// import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
// import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
// import { LoginDto, RegisterDto } from 'src/users/dto/auth.dto';
// import { AuthService } from './auth.service';

// @ApiTags('auth')
// @Controller('auth')
// export class AuthController {
//   constructor(private readonly authService: AuthService) {}

//   @Post('register')
//   @ApiOperation({ summary: 'Register a new user' })
//   @ApiResponse({ status: HttpStatus.CREATED, description: 'User registered successfully' })
//   @ApiResponse({ status: HttpStatus.CONFLICT, description: 'Email already in use' })
//   async register(@Body() registerDto: RegisterDto) {
//     return this.authService.register(registerDto);
//   }

//   @Post('login')
//   @HttpCode(HttpStatus.OK)
//   @ApiOperation({ summary: 'User login' })
//   @ApiResponse({ status: HttpStatus.OK, description: 'Login successful' })
//   @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Invalid credentials' })
//   async login(@Body() loginDto: LoginDto) {
//     return this.authService.login(loginDto);
//   }
// }