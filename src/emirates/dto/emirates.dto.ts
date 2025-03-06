import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsBoolean, IsOptional, IsArray, Min, IsEmail, IsNotEmpty, IsDateString, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateFlightDto {
  @ApiProperty({ example: 'EMA101' })
  @IsString()
  number: string;

  @ApiProperty({ example: 'دبي' })
  @IsString()
  from: string;

  @ApiProperty({ example: 'لندن' })
  @IsString()
  to: string;

  @ApiProperty({ example: '09:30' })
  @IsString()
  departureTime: string;

  @ApiProperty({ example: '11:45' })
  @IsString()
  arrivalTime: string;

  @ApiProperty({ example: '2025-03-10' })
  @IsString()
  date: string;

  @ApiProperty({ example: 30 })
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  baggageAllowance: number;

  @ApiProperty({ example: 350 })
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  price: number;

  @ApiProperty({ example: 'A12', required: false })
  @IsString()
  @IsOptional()
  gate?: string;

  @ApiProperty({ example: true, required: false })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @ApiProperty({ example: [], required: false })
  @IsArray()
  @IsOptional()
  occupiedSeats?: string[];
}

export class UpdateFlightDto {
  @ApiProperty({ example: 'EMA101', required: false })
  @IsString()
  @IsOptional()
  number?: string;

  @ApiProperty({ example: 'دبي', required: false })
  @IsString()
  @IsOptional()
  from?: string;

  @ApiProperty({ example: 'لندن', required: false })
  @IsString()
  @IsOptional()
  to?: string;

  @ApiProperty({ example: '09:30', required: false })
  @IsString()
  @IsOptional()
  departureTime?: string;

  @ApiProperty({ example: '11:45', required: false })
  @IsString()
  @IsOptional()
  arrivalTime?: string;

  @ApiProperty({ example: '2025-03-10', required: false })
  @IsString()
  @IsOptional()
  date?: string;

  @ApiProperty({ example: 30, required: false })
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  @IsOptional()
  baggageAllowance?: number;

  @ApiProperty({ example: 350, required: false })
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  @IsOptional()
  price?: number;

  @ApiProperty({ example: 'A12', required: false })
  @IsString()
  @IsOptional()
  gate?: string;

  @ApiProperty({ example: true, required: false })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @ApiProperty({ example: [], required: false })
  @IsArray()
  @IsOptional()
  occupiedSeats?: string[];
}

export class CreateBookingDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsUUID()
  flightId: string;

  @ApiProperty({ example: 'محمد' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'أحمد' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ example: 'AB123456' })
  @IsString()
  @IsNotEmpty()
  passport: string;

  @ApiProperty({ example: '1990-01-01' })
  @IsDateString()
  birthDate: string;

  @ApiProperty({ example: 'إماراتي' })
  @IsString()
  @IsNotEmpty()
  nationality: string;

  @ApiProperty({ example: '+971123456789' })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ example: 'example@email.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '12A' })
  @IsString()
  @IsNotEmpty()
  seat: string;

  @ApiProperty({ example: 'base64-encoded-file-data', required: false })
  @IsString()
  @IsOptional()
  passportFile?: string;
}

export class UpdateBookingStatusDto {
  @ApiProperty({ example: 'confirmed' })
  @IsString()
  @IsNotEmpty()
  status: string;
}