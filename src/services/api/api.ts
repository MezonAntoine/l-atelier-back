const moduleAlias = require('module-alias');

moduleAlias.addAliases({
  common: `${__dirname}/../../common`,
  config: `${__dirname}/../../config`,
});

import service from 'common/initializers/_service';
import mongoose from 'common/initializers/mongoose';
import express from 'common/initializers/express';
import expressRoutes from 'common/initializers/expressRoutes';
import expressErrors from 'common/initializers/expressErrors';
import http from 'common/initializers/http';
import httpListen from 'common/initializers/httpListen';

const initializers = [mongoose, express, expressRoutes, expressErrors, http, httpListen];

service('api', initializers);
