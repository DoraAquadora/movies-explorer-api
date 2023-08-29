const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('cors');
const { mongoDB } = require('./config');
const router = require('./routes/index');
const { limiter } = require('./middlewares/limiter');
const defaultError = require('./middlewares/defaultError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const {
  PORT = 3000,
  BASE_PATH,
  DB,
} = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

mongoose.connect(mongoDB || DB);

app.use(cors({
  origin: ['https://api.doramovies.nomoredomains.sbs', 'http://api.doramovies.nomoredomains.sbs', 'https://doramovies.nomoredomains.sbs', 'http://doramovies.nomoredomains.sbs', 'http://localhost:3000'],
  credentials: true,

})); // для бэка и будующего фронта задел

app.use(requestLogger);
app.use(limiter);

app.use('/', router);

app.use(errorLogger);

app.use(errors());
app.use(defaultError);

app.listen(PORT, () => {
  console.log('пять минут полет нормальный');
  console.log(`${BASE_PATH}`);
});
