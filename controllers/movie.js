const Movie = require('../models/movie');
const error = require('../utils/constants');
const errorCode = require('../errors/errors');

const getMovie = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .orFail(() => new errorCode.NotFound(error.NotExistMov))
    .then((movies) => res.send(movies))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  })
    .then((movie) => {
      res.status(201).send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new errorCode.BadRequest(error.BadRequestMsg));
      } else {
        next(err);
      }
    });
};

const deleteMovie = (req, res, next) => {
  const movieId = req.params._id; // достаем фильм
  const owner = req.user._id; // достаем юзера
  Movie.findById(movieId) // ищем фильм по id
    .then((movies) => {
      if (!movies) { // проверим есть ли фильм
        return next(new errorCode.NotFound(error.NotExistMov));
      } // если есть, проверим доступ
      if (movies.owner.toHexString() !== owner) {
        return next(new errorCode.Forbidden(error.ForbiddenMsg));// доступа нет, 403
      } // доступ есть, удалить
      return Movie.deleteOne(movies) // вернули карточку при удалении
        .then(() => res.send({ message: error.Deleted }))
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new errorCode.BadRequest(error.BadRequestMsg));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getMovie,
  createMovie,
  deleteMovie,
};
