const User = require('../models/user');
const error = require('../utils/constants');
const errorCode = require('../errors/errors');

const checkUser = (user, res) => {
  if (!user) {
    throw new errorCode.NotFound(error.NotFoundMsg);
  }
  return res.send(user);
};

const getYourself = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new errorCode.NotFound(error.NotFoundMsg);
    })
    .then((user) => res.send(user))
    .catch(next);
};

const editUser = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { new: true, runValidators: true },
  )
    .then((user) => checkUser(user, res))
    .catch((err) => {
      if (err.code === 11000) {
        next(new errorCode.Conflict(error.AlreadyExistMsg));
      } else if (err.code === 'ValidationError') {
        next(new errorCode.BadRequest(error.BadRequestMsg));
      } else {
        next(err);
      }
    });
};

module.exports = {
  checkUser,
  getYourself,
  editUser,
};
