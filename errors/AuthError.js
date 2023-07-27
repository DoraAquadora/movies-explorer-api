const AuthMsg = 'Неверная почта или пароль';

class Unauthorized extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

module.exports = { Unauthorized, AuthMsg };
