const urlregex = /^(http|https):\/\/[^ "<>#%]+\.[^ "<>#%]+[^ "<>#%]+#?/;

const AlreadyExistMsg = 'Пользователь с таким email уже существует';
const NotExistMov = 'Фильм не существует';
const AuthMsg = 'Неправильный логин или пароль';
const EmptyTokenMsg = 'При авторизации произошла ошибка токена.';
const NeedAuthMsg = 'Необходима авторизация';
const BadRequestMsg = 'Переданные данные неверны ';
const ForbiddenMsg = 'Нет доступа';
const Deleted = 'Удалено';
const NotFoundMsg = 'Страницы не существует. Не найдено';
const CreatedSuccess = 'Успешно создано';
module.exports = {
  urlregex,
  AlreadyExistMsg,
  NotExistMov,
  AuthMsg,
  EmptyTokenMsg,
  NeedAuthMsg,
  BadRequestMsg,
  ForbiddenMsg,
  Deleted,
  NotFoundMsg,
  CreatedSuccess,
};
