import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class AdminLoginDto {
  @ApiProperty({
    example: 'test@example.com',
    description: 'Valid email address',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'pass123', description: 'Password of the user' })
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
