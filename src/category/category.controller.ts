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
import { CategoryRequest } from './category.request';
import { CategoryResponse } from './category.response';
import { CategoryService } from './category.service';

@Controller('categories')
@UseInterceptors(new TransformInterceptor(CategoryResponse))
@ApiTags('Category Management')
export class CategoryController {
  constructor(private readonly service: CategoryService) {}

  @Get()
  async findAll(@Query() params: PaginateQuery) {
    return await this.service.findAll(params);
  }

  @Get(':id')
  async findById(@Param('id', ParseMongoIdPipe) id: string) {
    return await this.service.findById(id);
  }

  @Post()
  async create(@Body() data: CategoryRequest) {
    return await this.service.create(data);
  }

  @Put(':id')
  async update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() data: CategoryRequest,
  ) {
    return await this.service.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id', ParseMongoIdPipe) id: string) {
    return await this.service.delete(id);
  }
}
