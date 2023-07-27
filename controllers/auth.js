require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const error = require('../errors/errors');

const { NODE_ENV, JWT_SECRET } = process.env;

const createUser = (req, res, next) => {
  const {
    name, email,
  } = req.body;
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => {
      res.status(201).send({
        name: user.name,
        email: user.email,
      });
    })
    .catch((err) => {
      if (err.code === 'ValidationError') {
        next(new error.BadRequest(error.BadRequestMsg));
      } else if (err.code === 11000) {
        next(new error.Conflict(error.AlreadyExistMsg));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(next);
};

module.exports = {
  login,
  createUser,
};
