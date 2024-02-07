import dotenv from 'dotenv';
import config from '../../../config'

export = async () => {
  dotenv.config();

    global['CONFIG'] = config;
};
