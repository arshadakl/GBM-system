import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsOptional } from 'class-validator';

export class UpdateProfileDto {
  @ApiProperty({
    example: 'test@example.com',
    description: "User's updated email address",
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    example: '1234567890',
    description: "User's updated phone number",
  })
  @IsOptional()
  @IsString()
  phone?: string;
}
