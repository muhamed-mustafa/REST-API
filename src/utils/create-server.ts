import express from 'express';
import { deserializeUser } from '../middlewares/deserializeUser';
import routes from '../routes/route';

export const createServer = () => {
  const app = express();

  app.use(express.json());

  app.use(deserializeUser);

  routes(app);

  return app;
};
