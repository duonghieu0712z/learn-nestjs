import { Exclude, Expose, Transform } from '@nestjs/class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Category } from 'src/category/category.schema';

@Exclude()
export class ProductResponse {
  @Expose()
  @ApiProperty()
  id: string;

  @Expose()
  @ApiProperty()
  name: string;

  @Expose()
  @ApiProperty()
  description: string;

  @Expose()
  @ApiProperty()
  price: number;

  @Expose()
  @Transform((value) => value.obj[value.key])
  @ApiProperty()
  category: Category;
}
