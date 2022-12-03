import dotenv from 'dotenv';
dotenv.config();
import config from 'config';
import logger from './utils/logger';
import connect from './utils/connect';
import { createServer } from './utils/create-server';

const PORT = config.get<number>('port');

const app = createServer();

app.listen(PORT, async () => {
  logger.info(`App is running at http://localhost:${PORT}`);

  await connect();
});
