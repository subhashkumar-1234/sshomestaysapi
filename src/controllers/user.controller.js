const userService = require('../services/user.service');
const { sendSuccess } = require('../utils/response');

const registerUser = async (req, res, next) => {
  try {
    const user = await userService.createUser(req.body);
    return sendSuccess(res, 201, 'User registered successfully', user);
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userService.loginUser(email, password);
    return sendSuccess(res, 200, 'User logged in successfully', user);
  } catch (error) {
    next(error);
  }
};

const getUserProfile = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.user._id);
    return sendSuccess(res, 200, 'User profile fetched successfully', user);
  } catch (error) {
    next(error);
  }
};

const updateUserProfile = async (req, res, next) => {
  try {
    const updatedUser = await userService.updateUserProfile(req.user._id, req.body);
    return sendSuccess(res, 200, 'User profile updated successfully', updatedUser);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile
};
