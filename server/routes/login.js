import express from 'express';
import { validate } from 'express-validation';

import { loginUser } from '../controllers/auth.controller';
import validators from '../validators/login.validator';

const router = express.Router();

router.post(
  '/',
  validate(validators.loginUser, { keyByField: true }),
  loginUser
);

export { router };
