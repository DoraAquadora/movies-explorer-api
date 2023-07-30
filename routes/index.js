const router = require('express').Router();
const { celebrate } = require('celebrate');
const usersRouter = require('./users');
const movieRouter = require('./movie');
const auth = require('../middlewares/auth');
const error = require('../utils/constants');
const errorCode = require('../errors/errors');

const {
  login,
  createUser,
} = require('../controllers/auth');

const {
  validateCreateUser,
  validateLogin,
} = require('../utils/validators');

router.post('/signup', celebrate(validateCreateUser), createUser);
router.post('/signin', celebrate(validateLogin), login);

router.use('/users', auth, usersRouter);
router.use('/movies', auth, movieRouter);

router.use('*', auth, (req, res, next) => {
  next(new errorCode.NotFound(error.NotFoundMsg));
});

module.exports = router;
