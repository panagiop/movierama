import express from 'express';
import { getUser, createUser } from '../controllers/users.controller';

const router = express.Router();

router.get('/:email', getUser);
router.post('/', createUser);

export { router };
