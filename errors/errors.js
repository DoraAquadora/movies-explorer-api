const { Conflict } = require('./AlreadyExistError');
const { Unauthorized } = require('./AuthError');
const { BadRequest } = require('./BadRequestError');
const { Forbidden } = require('./ForbiddenError');
const { NotFound } = require('./NotFoundError');
const { Success } = require('./SuccessStatus');

module.exports = {
  Conflict,
  Unauthorized,
  BadRequest,
  Forbidden,
  NotFound,
  Success,
};
