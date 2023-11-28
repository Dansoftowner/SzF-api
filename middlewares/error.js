const ErrorResponse = require('../utils/errorResponse');

module.exports = (err, req, res, next) => {
  console.error(err);

  let status = 500;
  if (err instanceof ErrorResponse) status = err.status;

  res
    .status(status)
    .json({ success: false, error: err.message || 'Internal server error' });
};
