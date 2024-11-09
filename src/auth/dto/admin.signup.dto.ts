import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, IsString, MinLength } from 'class-validator';

export class AdminSignupDto {
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
}
