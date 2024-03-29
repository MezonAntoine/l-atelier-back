import logger from 'winston';
import { consoleFormat } from 'winston-console-format';

const { createLogger, format, transports } = logger;

const customLevels = {
  levels: {
    error: 0,
    warn: 1,
    http: 2,
    info: 3,
    debug: 4,
  },
};
const customFormat = logger.format.printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});
export = async () => {
  logger.clear();

  logger.configure({
    levels: customLevels.levels,
    exitOnError: false,
  });

  logger.stream = {
    write: (message: string) => {
      logger.http(message.replace('\n', ''));
    },
  } as any;

  const CONFIG = global['CONFIG'];

  if (CONFIG.logs.console) {
    const transportConsole = new logger.transports.Console({
      format: format.combine(format.timestamp(), customFormat),
      handleExceptions: true,
      level: 'debug',
    });

    logger.add(transportConsole);
  }
  if (CONFIG.logs.debug) {
    const transportDebug = createLogger({
      level: 'silly',
      format: format.combine(
        format.timestamp(),
        format.ms(),
        format.errors({ stack: true }),
        format.splat(),
        format.json(),
      ),
      transports: [
        new transports.Console({
          format: format.combine(
            format.colorize({ all: true }),
            format.padLevels(),
            consoleFormat({
              showMeta: true,
              metaStrip: ['timestamp', 'service'],
              inspectOptions: {
                depth: Infinity,
                colors: true,
                maxArrayLength: Infinity,
                breakLength: 120,
                compact: Infinity,
              },
            }),
          ),
        }),
      ],
    });

    logger.add(transportDebug);
  }
};
