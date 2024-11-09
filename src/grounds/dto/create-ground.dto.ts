import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsBoolean,
  IsArray,
} from 'class-validator';

export class CreateGroundDto {
  @ApiProperty({ example: 'Football Arena', description: 'Name of the ground' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Bangalore', description: 'Name of the location' })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({ example: 'Football', description: 'Type of the ground' })
  @IsString()
  @IsNotEmpty()
  type: string; // e.g., 'football', 'cricket'

  @ApiProperty({
    example: ['5s', '6s', '7s', '11s'],
    description: 'Capabilities of the ground',
  })
  @IsArray()
  capabilities: string[]; // e.g., ['5s', '6s', '7s', '11s']

  @ApiProperty({ example: 1000, description: 'Price of the ground' })
  @IsNumber()
  price: number;

  @ApiProperty({
    example: true,
    description: 'Indicates if lighting is available',
  })
  @IsBoolean()
  hasLighting: boolean; // True if lighting is available
}
