import logger from 'winston';
import figlet from 'figlet';
import loggerInit from './_logger';
import configInit from './_config';
import prototypes from './_prototypes';

// const figletHelper = require('../helpers/figletHelper');

const showServiceTitle = (projectName: string, serviceName: string) => {
  console.info('\n');

  const title = figlet.textSync(projectName.toUpperCase() + ' ' + serviceName.toUpperCase(), {
    font: 'Doom',
    horizontalLayout: 'default',
    verticalLayout: 'default',
  });

  console.info(title);
};

export = async (serviceName: 'api', initializers: any) => {
  global['SERVICE'] = {
    serviceName,
  };

  await configInit();
  await loggerInit();
  await prototypes();

  const CONFIG = global['CONFIG'];

  const serviceNameUpperCase = serviceName.toUpperCase();
  try {
    showServiceTitle(CONFIG.project_name, serviceName);

    logger.info(`-------- ' ${serviceNameUpperCase} ' --------`);
    logger.info(`['${serviceNameUpperCase}'] Starting initialization`);
    logger.info('[CONFIG] Loaded');
    logger.info('[LOGGER] Initialized');

    process.on('unhandledRejection', (err: any) => {
      logger.error(err.stack || err);
    });

    process.on('uncaughtException', (err: any) => {
      logger.error(err.stack || err);
    });

    const serviceConfig = CONFIG.services[serviceName];

    if (!serviceConfig) {
      throw new Error('Microservice need config');
    }

    await initializers.asyncForEach(async (item: Function) => {
      await item();
    });

    logger.info(`['${serviceNameUpperCase}'] Initialized SUCCESSFULLY`);
  } catch (err: any) {
    logger.error(err.stack || err);
    logger.info(`['${serviceNameUpperCase}'] Initialized FAILED`);
  }
};
