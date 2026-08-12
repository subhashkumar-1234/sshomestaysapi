const jwt = require('jsonwebtoken');
const env = require('../config/env');
const { sendError } = require('../utils/response');
const userService = require('../services/user.service');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, env.jwtSecret);
      
      const user = await userService.getUserById(decoded.id);
      if (!user) {
        return sendError(res, 401, 'User associated with this token no longer exists');
      }

      req.user = user;
      next();
    } catch (error) {
      return sendError(res, 401, 'Not authorized, token failed validation');
    }
  }

  if (!token) {
    return sendError(res, 401, 'Not authorized, access token missing');
  }
};

module.exports = { protect };
