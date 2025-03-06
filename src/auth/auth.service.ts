// import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import * as bcrypt from 'bcrypt';
// import { LoginDto, RegisterDto } from 'src/users/dto/auth.dto';
// import { UsersService } from '../users/users.service';

// @Injectable()
// export class AuthService {
//     constructor(
//         private usersService: UsersService,
//         private jwtService: JwtService,
//     ) { }

//     async register(registerDto: RegisterDto) {
//         const user = await this.usersService.create(registerDto);

//         // Remove password from response
//         const { password, ...result } = user;

//         return result;
//     }

//     async login(loginDto: LoginDto) {
//         try {
//             const user = await this.usersService.findByEmail(loginDto.email);

//             const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);

//             if (!isPasswordValid) {
//                 throw new UnauthorizedException('Invalid credentials');
//             }

//             const payload = { email: user.email, userId: user._id, role: user.role };

//             return {
//                 accessToken: this.jwtService.sign(payload),
//                 user: {
//                     id: user._id,
//                     email: user.email,
//                     firstName: user.firstName,
//                     lastName: user.lastName,
//                     role: user.role,
//                 },
//             };
//         } catch (error) {
//             if (error instanceof NotFoundException) {
//                 // Convert to UnauthorizedException to not leak user existence
//                 throw new UnauthorizedException('Invalid credentials');
//             }
//             throw error;
//         }
//     }

//     async validateUser(payload: any) {
//         return this.usersService.findOne(payload.userId);
//     }
// }