import express, { NextFunction } from 'express';
import logger from 'winston';
import cors from 'cors';
import httpContext from 'express-http-context';

export = () => {
    logger.info('[EXPRESS] Initializing');
    const { serviceName } = global['SERVICE'];

    const { services } = global['CONFIG'];

    const httpConfig = services[serviceName].http;

    if (!httpConfig) {
        throw new Error('Microservice need http config');
    }

    const app = express();

    logger.info('[EXPRESS] Initializing req/res');

    app.use(
        cors({
            origin: '*',
        }),
    );

    app.use((req: any, res: any, next: NextFunction) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', '*');
        res.header('Access-Control-Allow-Headers', '*');

        req.clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        req.currentDate = new Date();

        next();
    });

    logger.info('[EXPRESS] Initializing logger');

    logger.info('[EXPRESS] Initializing security and compression');

    app.use(express.json());

    app.use(httpContext.middleware);

    app.set('trust proxy', 1);

    global['SERVICE'].app = app;
};
