import { celebrate, Joi } from 'celebrate';

const mongoIdRegex = /^[0-9a-fA-F]{24}$/;

export const postCatDuelValidator = celebrate({
  body: Joi.object().keys({
    winnerId: Joi.string().regex(mongoIdRegex).required(),
    loserId: Joi.string().regex(mongoIdRegex).required(),
  }),
});
