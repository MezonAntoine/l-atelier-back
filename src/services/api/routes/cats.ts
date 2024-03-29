import { Router } from 'express';

import { postCatDuelValidator } from '../validators/cats.validator';
import { getCatsController, getNextDuelController, postDuelController } from '../controllers/cats.controller';

export = (router: Router) => {
  router.route('/').get(getCatsController);
  router.route('/duel').get(getNextDuelController).post(postCatDuelValidator, postDuelController);
};
