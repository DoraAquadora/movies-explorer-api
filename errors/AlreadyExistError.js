const AlreadyExistMsg = 'Пользователь уже существует';

class Conflict extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
}

module.exports = { Conflict, AlreadyExistMsg };
