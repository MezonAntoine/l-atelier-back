import logger from 'winston';
import http from 'http';

const listen = async (server: http.Server, port: number) => {
  return new Promise((resolve) => {
    server.listen(port, () => {
      resolve(true);
    });
  });
};

export = async () => {
  const { serviceName, httpServer } = global['SERVICE'];

  const httpConfig = global['CONFIG'].services[serviceName].http;

  if (!httpConfig) {
    throw new Error('Microservice need http config');
  }

  await listen(httpServer, httpConfig.port);

  logger.info('[HTTP LISTEN] Listening on port ' + httpConfig.port);
};
