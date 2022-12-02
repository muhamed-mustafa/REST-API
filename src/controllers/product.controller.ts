import { Request, Response } from 'express';
import {
  CreateProductInput,
  UpdateProductInput,
} from '../schema/product.schema';
import {
  createProduct,
  deleteProduct,
  findAndUpdateProduct,
  findProduct,
} from '../service/product.service';

export async function createProductHandler(
  req: Request<{}, {}, CreateProductInput['body']>,
  res: Response
) {
  const user = res.locals.user._id;

  const product = await createProduct({
    ...req.body,
    user,
  });

  return res.send(product);
}

export async function updateProductHandler(
  req: Request<UpdateProductInput['params']>,
  res: Response
) {
  const userId = res.locals.user._id;
  const { productId } = req.params;

  const product = await findProduct({ productId });
  if (!product) {
    return res.sendStatus(404);
  }

  if (String(product.user) !== userId) {
    return res.sendStatus(403);
  }

  const updatedProduct = await findAndUpdateProduct(
    { productId },
    { ...req.body },
    {
      new: true,
    }
  );

  return res.send(updatedProduct);
}

export async function getProductHandler(
  req: Request<UpdateProductInput['params']>,
  res: Response
) {
  const { productId } = req.params;
  const product = await findProduct({ productId });

  if (!product) {
    return res.sendStatus(404);
  }

  return res.send(product);
}

export async function deleteProductHandler(
  req: Request<UpdateProductInput['params']>,
  res: Response
) {
  const userId = res.locals.user._id;
  const { productId } = req.params;

  const product = await findProduct({ productId });
  if (!product) {
    return res.sendStatus(404);
  }

  if (String(product.user) !== userId) {
    return res.sendStatus(403);
  }

  await deleteProduct({ productId });
  return res.sendStatus(200);
}
