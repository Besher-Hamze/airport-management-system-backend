import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, MinLength, IsNotEmpty } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'محمد' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'أحمد' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Password123!' })
  @IsString()
  @MinLength(8)
  password: string;
}

export class LoginDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Password123!' })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class UpdateUserDto {
  @ApiProperty({ example: 'محمد', required: false })
  @IsString()
  @IsNotEmpty()
  firstName?: string;

  @ApiProperty({ example: 'أحمد', required: false })
  @IsString()
  @IsNotEmpty()
  lastName?: string;

  @ApiProperty({ example: 'user@example.com', required: false })
  @IsEmail()
  email?: string;

  @ApiProperty({ example: 'Password123!', required: false })
  @IsString()
  @MinLength(8)
  password?: string;
}

export class AddFavoriteAirportDto {
  @ApiProperty({ example: 'sham' })
  @IsString()
  @IsNotEmpty()
  airportId: string;
}