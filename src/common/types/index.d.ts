import { Request, Response } from 'express';
import validate, { ValidateJS } from 'validate.js';
import jsforce from 'jsforce';
declare module 'module-alias';

export { };
declare global {
  var SERVICE: {
    serviceName: 'api';
    app?: Express;
    httpServer?: http.Server;
    error?: any;
  };
  var CONFIG: any;
  namespace Express {
    export interface Response {
      sentTimestamp: number;
    }
    export interface Request {
      startTimestamp: number;
    }
  }
}

// types are outdated we need to do it manually
declare module 'validate.js' {
  export interface ValidateJS {
    options: object;
  }
}
