import express from 'express';
import {
  getAllMovies,
  createMovie,
  likeMovie,
  hateMovie,
  resetVote
} from '../controllers/movies.controller';
import authMiddleware from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/', getAllMovies);
router.post('/', authMiddleware, createMovie);
router.put('/:id/like', authMiddleware, likeMovie);
router.put('/:id/hate', authMiddleware, hateMovie);
router.put('/:id/reset', authMiddleware, resetVote);

export { router };
