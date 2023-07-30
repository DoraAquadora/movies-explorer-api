const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const error = require('../utils/constants');
const errorCode = require('../errors/errors');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: [2, 'Минимальная длина поля "name" - 2'],
      maxlength: [30, 'Максимальная длина поля "name" - 30'],
    },
    email: {
      type: String,
      required: [true, 'Поле "Email" должно быть заполнено'],
      unique: true,
      validate: {
        validator: (v) => validator.isEmail(v),
      },
    },
    password: {
      type: String,
      required: [true, 'Поле "Пароль" должно быть заполнено'],
      select: false,
    },
  },
  {
    versionKey: false,
  },
);
/* eslint-disable-next-line */
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new errorCode.Unauthorized(error.AuthMsg));
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new errorCode.Unauthorized(error.AuthMsg));
        }

        return user;
      });
    });
};

module.exports = mongoose.model('user', userSchema);
