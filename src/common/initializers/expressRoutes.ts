import logger from 'winston';
import express from 'express';
import read from 'fs-readdir-recursive';
import path from 'path';

export = async () => {
  logger.info('[EXPRESS ROUTES] Initializing routes');

  const { app, serviceName } = global['SERVICE'];
  const directory = '../../services/' + serviceName + '/routes/';
  const routes = read(path.join(__dirname, directory));
  // Initialize all routes
  routes.forEach((routeName: any) => {
    routeName = routeName.replace('\\', '/');
    const arr = routeName.match(/^(.+\/)?([a-zA-z0-9]+)\.(ts|js)$/);
    if (arr !== null) {
      const router = express.Router();
      require(directory + arr[0])(router);

      if (arr[2] === 'index') {
        app.use('/' + (arr[1] || ''), router);
      } else {
        app.use('/' + (arr[1] || '') + arr[2], router);
      }
    }
  });
};
