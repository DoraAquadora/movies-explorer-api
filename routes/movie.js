const movieRouter = require('express').Router();
const { celebrate } = require('celebrate');

const {
  validateMovies,
  validateMovieId,
} = require('../utils/validators');

const {
  getMovie,
  createMovie,
  deleteMovie,
} = require('../controllers/movie');

movieRouter.get('/', getMovie);
movieRouter.post('/', celebrate(validateMovies), createMovie);
movieRouter.delete('/:_id', celebrate(validateMovieId), deleteMovie);

module.exports = movieRouter;
