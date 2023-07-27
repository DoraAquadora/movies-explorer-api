const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, 'страна создания фильма. Обязательное поле-строка.'],
  },
  director: {
    type: String,
    required: [true, 'режиссёр фильма. Обязательное поле-строка.'],
  },
  duration: {
    type: Number,
    required: [true, 'длительность фильма. Обязательное поле-число.'],
  },
  year: {
    type: String,
    required: [true, 'год выпуска фильма. Обязательное поле-строка.'],
  },
  description: {
    type: String,
    required: [true, 'описание фильма. Обязательное поле-строка.'],

  },
  image: {
    type: String,
    required: [true, 'ссылка на постер к фильму. Обязательное поле-строка.'],
    validate: {
      validator: (v) => validator.isURL(v),
    },
  },
  trailerLink: {
    type: String,
    required: [true, 'ссылка на трейлер фильма. Обязательное поле-строка.'],
    validate: {
      validator: (v) => validator.isURL(v),
    },
  },
  thumbnail: {
    type: String,
    required: [true, 'миниатюрное изображение постера к фильму. Обязательное поле-строка.'],
    validate: {
      validator: (v) => validator.isURL(v),
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: [true, 'id фильма, который содержится в ответе. Обязательное поле.'],
  },
  nameRU: {
    type: String,
    required: [true, 'название фильма на русском языке. Обязательное поле-строка.'],
  },
  nameEN: {
    type: String,
    required: [true, 'название фильма на английском языке. Обязательное поле-строка.'],
  },
}, {
  versionKey: false,
});

module.exports = mongoose.model('movie', movieSchema);
