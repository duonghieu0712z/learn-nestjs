import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Category } from 'src/category/category.schema';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true, unique: true, trim: true, maxlength: 255 })
  name!: string;

  @Prop({ default: '', trim: true, maxlength: 1000 })
  description?: string;

  @Prop({ default: 0, min: 0 })
  price: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Category.name,
    required: true,
  })
  category: Category;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
