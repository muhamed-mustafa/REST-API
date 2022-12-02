import logger from 'pino';
import dayjs from 'dayjs';

const log = logger({
  target: 'pino-pretty',

  prettifier: true,

  base: {
    pid: false,
  },

  options: {
    colorize: true,
  },

  timestamp: () => `"time":"${dayjs().format()}"`,
});

export default log;
