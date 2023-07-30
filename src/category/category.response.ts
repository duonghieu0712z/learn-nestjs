import { Exclude, Expose } from '@nestjs/class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class CategoryResponse {
  @Expose()
  @ApiProperty()
  id: string;

  @Expose()
  @ApiProperty()
  name: string;
}
