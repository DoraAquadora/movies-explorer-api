const Movie = require('../models/movie');
const error = require('../errors/errors');

const getMovie = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .orFail(() => new error.NotFound(error.NotFoundMsg))
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
    .then((movies) => {
      res.status(201).send(movies);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new error.BadRequest(error.BadRequestMsg));
      } else {
        next(err);
      }
    });
};
// findByIdAndRemove
const deleteMovie = (req, res, next) => {
  Movie.findByIdAndRemove({ _id: req.params._id })
    .orFail(() => {
      throw new error.NotFound(error.NotFoundMsg);
    })
    .then((movie) => {
      const owner = movie.owner.toHexString();
      if (req.user._id === owner) {
        Movie.deleteOne(movie)
          .then(() => {
            res.status(200).send({ message: 'delited' });
          })
          .catch(next);
      } else {
        throw new error.Forbidden(error.ForbiddenMsg);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new error.BadRequest(error.BadRequestMsg));
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
