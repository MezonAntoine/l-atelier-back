import http from 'http';
import logger from 'winston';

export = async () => {
    logger.info('[HTTP] Initializing');

    const { app } = global['SERVICE'];

    logger.info('[HTTP] Initializing http without ssl');

    global['SERVICE'].httpServer = http.createServer(app);
};
