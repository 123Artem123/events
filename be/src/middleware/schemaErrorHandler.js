const { ValidationError } = require('express-validation');

module.exports = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    const { statusCode, message, details } = err;
    return res.status(statusCode).json({ message, details });
  }
  return next(err);
};
