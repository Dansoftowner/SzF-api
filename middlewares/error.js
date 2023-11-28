const ErrorResponse = require('../utils/errorResponse');

module.exports = (err, req, res, next) => {
  console.error(err);

  let status = 500;
  let message = 'Internal server error';

  if (err instanceof ErrorResponse) status = err.status;
  if (err.message) message = err.message;

  if (err.code === 11000) {
    message = 'Duplicate field value';
    status = 400;
  }

  res.status(status).json({ success: false, error: message });
};
