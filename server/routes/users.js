import express from 'express';
import { createUser } from '../controllers/users.controller';

const router = express.Router();

router.post('/', createUser);

export { router };
