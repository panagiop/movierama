import express from 'express';
import { validate } from 'express-validation';
import {
  getAllMovies,
  createMovie,
  likeMovie,
  hateMovie,
  resetVote
} from '../controllers/movies.controller';
import authMiddleware from '../middlewares/auth.middleware';
import validators from '../validators/movies.validator';

const router = express.Router();

router.get('/', getAllMovies);
router.post(
  '/',
  [authMiddleware, validate(validators.createMovie, { keyByField: true })],
  createMovie
);
router.put('/:id/like', authMiddleware, likeMovie);
router.put('/:id/hate', authMiddleware, hateMovie);
router.put('/:id/reset', authMiddleware, resetVote);

export { router };
