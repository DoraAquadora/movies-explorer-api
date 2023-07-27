const { Conflict, AlreadyExistMsg } = require('./AlreadyExistError');
const { Unauthorized, AuthMsg } = require('./AuthError');
const { BadRequest, BadRequestMsg } = require('./BadRequestError');
const { Forbidden, ForbiddenMsg } = require('./ForbiddenError');
const { NotFound, NotFoundMsg } = require('./NotFoundError');

module.exports = {
  Conflict,
  AlreadyExistMsg,
  Unauthorized,
  AuthMsg,
  BadRequest,
  BadRequestMsg,
  Forbidden,
  ForbiddenMsg,
  NotFound,
  NotFoundMsg,
};
