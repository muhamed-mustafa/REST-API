import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import config from 'config';
import logger from './utils/logger';
import connect from './utils/connect';
import { deserializeUser } from './middlewares/deserializeUser';
import routes from './routes/route';

const app = express();

app.use(express.json());
app.use(deserializeUser);

const PORT = config.get<number>('port');

app.listen(PORT, async () => {
  logger.info(`App is running at http://localhost:${PORT}`);

  await connect();

  routes(app);
});
