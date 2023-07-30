import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PaginateQuery } from 'src/common/paginate-query';
import { TransformInterceptor } from 'src/interceptors/transform/transform.interceptor';
import { ParseMongoIdPipe } from 'src/pipes/parse-mongo-id/parse-mongo-id.pipe';
import { ProductRequest } from './product.request';
import { ProductResponse } from './product.response';
import { ProductService } from './product.service';

@Controller('products')
@UseInterceptors(new TransformInterceptor(ProductResponse))
@ApiTags('Product Management')
export class ProductController {
  constructor(private readonly service: ProductService) {}

  @Get()
  async findAll(@Query() params: PaginateQuery) {
    return this.service.findAll(params);
  }

  @Get(':id')
  async findById(@Param('id', ParseMongoIdPipe) id: string) {
    return this.service.findById(id);
  }

  @Post()
  async create(@Body() data: ProductRequest) {
    return this.service.create(data);
  }

  @Put(':id')
  async update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() data: ProductRequest,
  ) {
    return await this.service.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id', ParseMongoIdPipe) id: string) {
    return await this.service.delete(id);
  }
}
