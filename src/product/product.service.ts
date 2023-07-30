import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel, PaginateResult } from 'mongoose';
import { PaginateQuery } from 'src/common/paginate-query';
import { ProductRequest } from './product.request';
import { Product, ProductDocument } from './product.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly model: PaginateModel<ProductDocument>,
  ) {}

  async findAll(params: PaginateQuery): Promise<PaginateResult<Product>> {
    return await this.model.paginate(
      {},
      { page: params.page, limit: params.limit },
    );
  }

  async findById(id: string): Promise<Product> {
    return await this.model
      .findById(id)
      .orFail(new BadRequestException(`Not found product with _id = '${id}'`));
  }

  async create(data: ProductRequest): Promise<Product> {
    return await new this.model(data).save();
  }

  async update(id: string, data: ProductRequest) {
    await this.model
      .findByIdAndUpdate(id, data)
      .orFail(new BadRequestException(`Not found product with _id = '${id}'`));
  }

  async delete(id: string) {
    await this.model
      .findByIdAndDelete(id)
      .orFail(new BadRequestException(`Not found product with _id = '${id}'`));
  }
}
