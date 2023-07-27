const User = require('../models/user');
const error = require('../errors/errors');

const checkUser = (user, res) => {
  if (!user) {
    throw new error.NotFound(error.NotFoundMsg);
  }
  return res.send(user);
};

const getYourself = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new error.NotFound(error.NotFoundMsg);
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
      if (err.code === 'ValidationError') {
        next(new error.BadRequest(error.BadRequestMsg));
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
