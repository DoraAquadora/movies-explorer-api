require('dotenv').config();
const jwt = require('jsonwebtoken');
const error = require('../utils/constants');
const errorCode = require('../errors/errors');

const BearerToken = (header) => header.replace('Bearer ', '');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer')) {
    return next(new errorCode.Unauthorized(error.EmptyTokenMsg));
  }

  const token = BearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    next(new errorCode.Unauthorized(error.NeedAuthMsg));
  }

  req.user = payload;

  return next();
};
