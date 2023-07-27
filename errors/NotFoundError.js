const NotFoundMsg = 'Не найдено';

class NotFound extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

module.exports = { NotFound, NotFoundMsg };
