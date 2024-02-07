import logger from 'winston';
import mongoose from 'mongoose';

export = async () => {
    logger.info('[MONGOOSE] Connection to mongodb');

    const { uri } = CONFIG.credentials.mongodb;

    if (!uri) {
        throw new Error('Microservice needs mongodb credentials');
    }

    try {
        await mongoose.connect(uri, {});
    } catch (err) {
        throw new Error(`Error mongoose init: ${err}`);
    }

    logger.info('[MONGOOSE] Load models');

    require('../models/index');
};
