import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';

const validate =
  (schema: AnyZodObject) =>
  ({ body, query, params }: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body,
        query,
        params,
      });

      next();
    } catch (e: any) {
      return res.status(400).send(e.errors);
    }
  };

export default validate;
