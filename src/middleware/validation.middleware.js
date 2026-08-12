const { sendError } = require('../utils/response');

const validateRegister = (req, res, next) => {
  const { name, email, password } = req.body;
  const errors = [];

  if (!name || name.trim() === '') {
    errors.push('Name is required');
  }

  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    errors.push('A valid email address is required');
  }

  if (!password || password.length < 6) {
    errors.push('Password must be at least 6 characters long');
  }

  if (errors.length > 0) {
    return sendError(res, 400, 'Validation Failed', errors);
  }

  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  const errors = [];

  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    errors.push('A valid email address is required');
  }

  if (!password) {
    errors.push('Password is required');
  }

  if (errors.length > 0) {
    return sendError(res, 400, 'Validation Failed', errors);
  }

  next();
};

module.exports = {
  validateRegister,
  validateLogin
};
