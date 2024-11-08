import winston from 'winston';

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4
};

const level = () => {
  const env = process.env.NODE_ENV || 'development';
  const isDevelopment = env === 'development';
  return isDevelopment ? 'debug' : 'info';
};

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white'
};

winston.addColors(colors);

const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf(({ timestamp, level, message, ...meta }) => {
    const metaString = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : '';
    return `[${timestamp}] ${level}: ${message} ${metaString}`;
  }),
  winston.format.errors({ stack: true }),
  winston.format.metadata()
);

const isTestEnv = process.env.NODE_ENV === 'test';

type TransportType = winston.transports.ConsoleTransportInstance;

const transports: TransportType[] = [
  new winston.transports.Console({
    format: winston.format.combine(format, winston.format.colorize({ all: true })),
    silent: isTestEnv
  })
];

const Logger = winston.createLogger({
  level: level(),
  levels,
  transports
});

export default Logger;
