import {
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ProductRequest {
  @IsString()
  @MaxLength(255)
  @ApiProperty()
  name!: string;

  @IsString()
  @IsOptional()
  @MaxLength(1000)
  @ApiProperty()
  description?: string;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @ApiProperty()
  price: number;

  @IsMongoId()
  @ApiProperty()
  category: string;
}
