import { IsString, MaxLength } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CategoryRequest {
  @IsString()
  @MaxLength(255)
  @ApiProperty()
  name!: string;
}
