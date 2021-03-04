import { Joi } from 'express-validation';

export default {
  // POST /api/users
  createUser: {
    body: Joi.object({
      username: Joi.string().min(2).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required()
    })
  }
};
