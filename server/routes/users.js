import express from 'express';
import { validate } from 'express-validation';

import { getUser, createUser } from '../controllers/users.controller';
import validators from '../validators/users.validator';

const router = express.Router();

router.get('/:email', getUser);
router.post(
  '/',
  validate(validators.createUser, { keyByField: true }),
  createUser
);

export { router };
