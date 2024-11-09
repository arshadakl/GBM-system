import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'arshad', description: 'Username of the user' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ example: 'pass123', description: 'Password of the user' })
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
