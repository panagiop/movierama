import { Joi } from 'express-validation';

export default {
  // POST /api/users
  loginUser: {
    body: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required()
    })
  }
};
