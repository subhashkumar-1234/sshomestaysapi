/**
 * Standard API response helper utilities
 */

const sendSuccess = (res, statusCode = 200, message = "Success", data = null) => {
  const responsePayload = {
    success: true,
    message,
  };

  if (data !== null) {
    responsePayload.data = data;
  }

  return res.status(statusCode).json(responsePayload);
};

const sendError = (res, statusCode = 500, message = "Internal Server Error", errors = null) => {
  const responsePayload = {
    success: false,
    message,
  };

  if (errors !== null) {
    responsePayload.errors = errors;
  }

  return res.status(statusCode).json(responsePayload);
};

module.exports = {
  sendSuccess,
  sendError,
};
