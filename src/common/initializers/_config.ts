import config from '../../../config';

export = async () => {
    global['CONFIG'] = config;
};
