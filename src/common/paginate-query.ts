import { IsNumber, IsOptional } from '@nestjs/class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class PaginateQuery {
  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional()
  page?: number = 1;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional()
  limit?: number = 10;
}
