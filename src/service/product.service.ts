import { FilterQuery, UpdateQuery, QueryOptions } from 'mongoose';
import {
  Product,
  ProductDocument,
  ProductInput,
} from '../models/product.model';
import { databaseResponseTimeHistogram } from '../utils/metrics';

async function createProduct(input: ProductInput) {
  const metricsLabels = {
    operation: 'createProduct',
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await Product.create(input);
    timer({ ...metricsLabels, success: 'true' });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: 'false' });
    throw e;
  }
}

async function findProduct(
  query: FilterQuery<ProductDocument>,
  options: QueryOptions = { lean: true }
) {
  const metricsLabels = {
    operation: 'findProduct',
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await Product.findOne(query, {}, options);
    timer({ ...metricsLabels, success: 'true' });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: 'false' });

    throw e;
  }
}

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
