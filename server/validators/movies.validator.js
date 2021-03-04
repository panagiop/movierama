import { Joi } from 'express-validation';

export default {
  // POST /api/movies
  createMovie: {
    body: Joi.object({
      name: Joi.string().min(2).required(),
      description: Joi.string().required()
    })
  }
};
