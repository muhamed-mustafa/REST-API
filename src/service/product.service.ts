import { FilterQuery, UpdateQuery, QueryOptions } from 'mongoose';
import {
  Product,
  ProductDocument,
  ProductInput,
} from '../models/product.model';

const createProduct = async (input: ProductInput) => {
  return Product.create(input);
};

const findProduct = async (
  query: FilterQuery<ProductDocument>,
  options: QueryOptions = { lean: true }
) => {
  return Product.findOne(query, {}, options);
};

const findAndUpdateProduct = async (
  query: FilterQuery<ProductDocument>,
  update: UpdateQuery<ProductDocument>,
  options: QueryOptions = { lean: true }
) => {
  return Product.findOneAndUpdate(query, update, options);
};

const deleteProduct = async (query: FilterQuery<ProductDocument>) => {
  return Product.deleteOne(query);
};

export { createProduct, findProduct, findAndUpdateProduct, deleteProduct };
