import mongoose from 'mongoose';
import config from 'config';
import logger from './logger';

async function connect() {
  try {
    await mongoose.connect(config.get<string>('dbUri'));
    logger.info('DB Connected Successfully');
  } catch (err: any) {
    logger.error(`${err.message}`);
    process.exit(1);
  }
}

export default connect;
