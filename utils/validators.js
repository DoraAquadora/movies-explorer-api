const { Joi } = require('celebrate');
const { urlregex } = require('./constants');

const validateCreateUser = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6).max(30),
  }),
};

const validateLogin = {
  body: Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6).max(30),
  }),
};

const validateEditUser = {
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
};

const validateMovies = {
  body: Joi.object({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(urlregex),
    trailerLink: Joi.string().required().regex(urlregex),
    thumbnail: Joi.string().required().regex(urlregex),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
};

const validateMovieId = {
  params: Joi.object({
    _id: Joi.string().required().hex().length(24),
  }),
};

const validateUserId = {
  params: Joi.object({
    _id: Joi.string().hex().length(24),
  }),
};

module.exports = {
  validateCreateUser,
  validateLogin,
  validateEditUser,
  validateMovies,
  validateMovieId,
  validateUserId,
};
