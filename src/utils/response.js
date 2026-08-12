/**
 * Send standard success response
 * @param {Object} res Express response object
 * @param {Number} statusCode HTTP status code (default: 200)
 * @param {String} message Success message
 * @param {Object|Array} data Data payload
 */
const sendSuccess = (res, statusCode = 200, message = 'Success', data = null) => {
  const responsePayload = {
    success: true,
    message
  };

  if (data !== null) {
    responsePayload.data = data;
  }

  return res.status(statusCode).json(responsePayload);
};

/**
 * Send standard error response
 * @param {Object} res Express response object
 * @param {Number} statusCode HTTP status code (default: 500)
 * @param {String} message Error message
 * @param {Array|Object} errors Detailed errors
 */
const sendError = (res, statusCode = 500, message = 'Internal Server Error', errors = null) => {
  const responsePayload = {
    success: false,
    message
  };

  if (errors !== null) {
    responsePayload.errors = errors;
  }

  return res.status(statusCode).json(responsePayload);
};

module.exports = {
  sendSuccess,
  sendError
};
