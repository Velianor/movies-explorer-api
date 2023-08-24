const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/config');
const UnauthorizedError = require('../errors/Unauthorized');

const auth = (req, res, next) => {
  let token;

  try {
    token = req.cookies.jwt;
  } catch (err) {
    next(new UnauthorizedError('Нужно авторизоваться'));
  }

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new UnauthorizedError('Нужно авторизоваться'));
  }
  req.user = payload;

  next();
};

module.exports = auth;
