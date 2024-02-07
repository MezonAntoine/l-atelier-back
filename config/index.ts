import dotenv from 'dotenv';
// import 'module-alias/register';

dotenv.config({});

export default {
  project_name: 'l-atelier-back-end',
  credentials: {
    mongodb: {
      uri: process.env.MONGODB_URI,
    },
  },
  services: {
    api: {
      http: {
        max_request_body_size: '100mb',
        port: process.env.PORT || 3000,
      },
    },
  },
  logs: {
    debug: true,
    console: false,
    file: false,
    logio: false,
    paths: {
      api: './tmp/images/api/logs',
      jobs: './tmp/images/jobs/logs',
    },
  },
};
