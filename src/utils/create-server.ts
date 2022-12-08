import cors from 'cors';
import config from 'config';
import express, { Request, Response } from 'express';
import { deserializeUser } from '../middlewares/deserializeUser';
import routes from '../routes/route';
import { restResponseTimeHistogram, startMetricsServer } from './metrics';
import responseTime from 'response-time';

export const createServer = () => {
  const app = express();

  app.use(express.json());

  app.use(deserializeUser);

  app.use(
    responseTime((req: Request, res: Response, time: number) => {
      if (req?.route?.path) {
        restResponseTimeHistogram.observe(
          {
            method: req.method,
            route: req.route.path,
            status_code: res.statusCode,
          },
          time * 1000
        );
      }
    })
  );

  app.use(
    cors({
      origin: config.get<string>('origin'),
      credentials: true,
    })
  );

  routes(app);

  if (process.env.NODE_ENV !== 'test') {
    startMetricsServer();
  }

  return app;
};
