import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel, PaginateResult } from 'mongoose';
import { PaginateQuery } from 'src/common/paginate-query';
import { CategoryRequest } from './category.request';
import { Category, CategoryDocument } from './category.schema';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private readonly model: PaginateModel<CategoryDocument>,
  ) {}

  async findAll(params: PaginateQuery): Promise<PaginateResult<Category>> {
    return await this.model.paginate(
      {},
      { page: params.page, limit: params.limit },
    );
  }

  async findById(id: string): Promise<Category> {
    return await this.model
      .findById(id)
      .orFail(new BadRequestException(`Not found category with _id = '${id}'`));
  }

  async create(data: CategoryRequest): Promise<Category> {
    return await new this.model(data).save();
  }

  async update(id: string, data: CategoryRequest) {
    await this.model
      .findByIdAndUpdate(id, data)
      .orFail(new BadRequestException(`Not found category with _id = '${id}'`));
  }

  async delete(id: string) {
    await this.model
      .findByIdAndDelete(id)
      .orFail(new BadRequestException(`Not found category with _id = '${id}'`));
  }
}
