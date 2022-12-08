import { Express } from 'express';
import {
  createProductHandler,
  deleteProductHandler,
  getProductHandler,
  updateProductHandler,
} from '../controllers/product.controller';
import {
  createUserSessionHandler,
  getUserSessionsHandler,
  deleteSessionHandler,
} from '../controllers/session.controller';
import { createUserHandler } from '../controllers/user.controller';
import { requireUser } from '../middlewares/requireUser';
import validateResource from '../middlewares/validateResource';
import {
  createProductSchema,
  deleteProductSchema,
  getProductSchema,
  updateProductSchema,
} from '../schema/product.schema';
import { createSessionSchema } from '../schema/session.schema';
import { createUserSchema } from '../schema/user.schema';

function routes(app: Express) {
  /**
   * @openapi
   * '/api/users':
   *  post:
   *     tags:
   *     - User
   *     summary: Register a user
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreateUserInput'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/CreateUserResponse'
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */
  app.post('/api/users', validateResource(createUserSchema), createUserHandler);

  /**
   * @openapi
   * '/api/sessions':
   *  post:
   *     tags:
   *     - Session
   *     summary: Create a session
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreateSessionInput'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/CreateSessionResponse'
   */
  app.post(
    '/api/sessions',
    validateResource(createSessionSchema),
    createUserSessionHandler
  );

  /**
   * @openapi
   * '/api/sessions':
   *  get:
   *     tags:
   *     - Sessions
   *     summary: Get all sessions for currentUser
   *     parameters:
   *      - name: x-auth-token
   *        in: header
   *        description: accessToken
   *        required: true
   *      - name: x-refresh
   *        in: header
   *        description: refreshToken
   *        required: true
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *          application/json:
   *           schema:
   *              $ref: '#/components/schema/GetSessionsResponse'
   *       403:
   *         description: Forbidden
   */
  app.get('/api/sessions', requireUser, getUserSessionsHandler);

  app.delete('/api/sessions', requireUser, deleteSessionHandler);

  /**
   * @openapi
   * '/api/products':
   *  post:
   *     tags:
   *     - create a new product
   *     summary: craete a new product
   *     parameters:
   *      - name: x-auth-token
   *        in: header
   *        description: accessToken
   *        required: true
   *      - name: x-refresh
   *        in: header
   *        description: refreshToken
   *        required: true
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreateProductInput'
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *          application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreateProductResponse'
   *       404:
   *         description: Product not found
   */
  app.post(
    '/api/products',
    [requireUser, validateResource(createProductSchema)],
    createProductHandler
  );

  /**
   * @openapi
   * '/api/products/{productId}':
   *  patch:
   *     tags:
   *     - Update Product
   *     summary: update product by the productId
   *     parameters:
   *      - name: productId
   *        in: path
   *        description: The id of the product
   *        required: true
   *      - name: x-auth-token
   *        in: header
   *        description: accessToken
   *        required: true
   *      - name: x-refresh
   *        in: header
   *        description: refreshToken
   *        required: true
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *          application/json:
   *           schema:
   *              $ref: '#/components/schema/Product'
   *       404:
   *         description: Product not found
   */
  app.put(
    '/api/products/:productId',
    [requireUser, validateResource(updateProductSchema)],
    updateProductHandler
  );

  /**
   * @openapi
   * '/api/products/{productId}':
   *  get:
   *     tags:
   *     - Products
   *     summary: Get a single product by the productId
   *     parameters:
   *      - name: productId
   *        in: path
   *        description: The id of the product
   *        required: true
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *          application/json:
   *           schema:
   *              $ref: '#/components/schema/Product'
   *       404:
   *         description: Product not found
   */
  app.get(
    '/api/products/:productId',
    validateResource(getProductSchema),
    getProductHandler
  );

  /**
   * @openapi
   * '/api/products/{productId}':
   *  delete:
   *     tags:
   *     - deleteProduct
   *     summary: delete product by the productId
   *     parameters:
   *      - name: productId
   *        in: path
   *        description: The id of the product
   *        required: true
   *      - name: x-auth-token
   *        in: header
   *        description: accessToken
   *        required: true
   *      - name: x-refresh
   *        in: header
   *        description: refreshToken
   *        required: true
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *          application/json:
   *       404:
   *         description: Product not found
   */
  app.delete(
    '/api/products/:productId',
    [requireUser, validateResource(deleteProductSchema)],
    deleteProductHandler
  );
}

export default routes;
