require('dotenv').config();
const jwt = require('jsonwebtoken');
const error = require('../errors/errors');

const BearerToken = (header) => header.replace('Bearer ', '');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer')) {
    return next(new error.Unauthorized(error.AuthMsg));
  }

  const token = BearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    next(new error.Unauthorized(error.AuthMsg));
  }

  req.user = payload;

  return next();
};
