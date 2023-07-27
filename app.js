const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('cors');
const router = require('./routes/index');
const defaultError = require('./middlewares/defaultError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const {
  PORT = 3000,
  mongoDB,
} = process.env;

mongoose.connect(mongoDB);

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors({

}));

app.use(requestLogger);

app.use(router);

app.use(errorLogger);

app.use(errors());
app.use(defaultError);

app.listen(PORT, () => {
  console.log('пять минут полет нормальный');
});
