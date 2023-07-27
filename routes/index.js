const router = require('express').Router();
const { celebrate } = require('celebrate');
const usersRouter = require('./users');
const movieRouter = require('./movie');
const auth = require('../middlewares/auth');
const error = require('../errors/errors');
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

router.use(auth);
router.use('/users', usersRouter);
router.use('/movies', movieRouter);

router.use('*', (req, res, next) => {
  next(new error.NotFound(error.NotFoundMsg));
});

module.exports = router;
