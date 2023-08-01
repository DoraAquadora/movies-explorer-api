const usersRouter = require('express').Router();
const { celebrate } = require('celebrate');

const {
  validateEditUser,
} = require('../utils/validators');

const {
  getYourself,
  editUser,
} = require('../controllers/users');

usersRouter.get('/me', getYourself);
usersRouter.patch('/me', celebrate(validateEditUser), editUser);

module.exports = usersRouter;
