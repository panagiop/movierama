const { ValidationError } = require('express-validation');
/* eslint-disable no-param-reassign */
// eslint-disable-next-line no-unused-vars
export default function errorHandlingMiddlware(err, req, res, next) {
  err.statusCode = err.statusCode || 400;
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json(err);
  }
  return err.customMessage || err.message
    ? res.status(err.statusCode).json({
        statusCode: err.statusCode,
        message: err.customMessage || err.message
      })
    : res
        .status(err.statusCode)
        .json({ statusCode: err.statusCode, message: err });
}
