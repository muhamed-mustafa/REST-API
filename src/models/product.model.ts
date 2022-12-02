import mongoose from 'mongoose';
import { UserDocument } from './user.model';
import { alphaNumeric } from '../utils/custom-alphabet';

export interface ProductDocument extends mongoose.Document {
  user: UserDocument['_id'];
  title: string;
  description: string;
  price: number;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
      unique: true,
      default: () => `product_${alphaNumeric(10)}`,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Product = mongoose.model<ProductDocument>(
  'Product',
  productSchema
);
