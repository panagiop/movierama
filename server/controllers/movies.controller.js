import { MovieModel as Movie } from '../models/Movie';
import { getAll, add, like, hate, reset } from '../services/movies.service';

const getAllMovies = async (req, res, next) => {
  try {
    const movies = await getAll(Movie, req.query);
    return res.json(movies);
  } catch (err) {
    return next(err);
  }
};

const createMovie = async (req, res, next) => {
  const { name, description } = req.body;
  try {
    const movie = await add(Movie, {
      name,
      description,
      createdBy: req.user.id
    });
    return res.json(movie);
  } catch (err) {
    return next(err);
  }
};

const likeMovie = async (req, res, next) => {
  try {
    const updatedMovie = await like(Movie, req.params.id, req.user.id);
    return res.json(updatedMovie);
  } catch (err) {
    return next(err);
  }
};

const hateMovie = async (req, res, next) => {
  try {
    const updatedMovie = await hate(Movie, req.params.id, req.user.id);
    return res.json(updatedMovie);
  } catch (err) {
    return next(err);
  }
};

const resetVote = async (req, res, next) => {
  try {
    const updatedMovie = await reset(Movie, req.params.id, req.user.id);
    return res.json(updatedMovie);
  } catch (err) {
    return next(err);
  }
};

export { getAllMovies, createMovie, likeMovie, hateMovie, resetVote };
