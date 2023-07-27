const ForbiddenMsg = 'Нет доступа';

class Forbidden extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
}

module.exports = { Forbidden, ForbiddenMsg };
