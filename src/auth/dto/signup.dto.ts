import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsEmail,
  IsString,
  MinLength,
  Matches,
} from 'class-validator';

export class SignupDto {
  @ApiProperty({ example: 'testuser', description: 'Unique username' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    example: 'test@example.com',
    description: 'Valid email address',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123', description: 'Strong password' })
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: '1234567890', description: '10-digit phone number' })
  @IsNotEmpty()
  @Matches(/^\d{10}$/, {
    message: 'Phone number must be a valid 10-digit number',
  })
  phone: string;
}
