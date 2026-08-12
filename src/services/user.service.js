const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const env = require("../config/env");

const generateToken = (id) => {
  return jwt.sign({ id }, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn,
  });
};

const createUser = async (userData) => {
  const existingUser = await userModel.getUserByEmail(userData.email);
  if (existingUser) {
    const error = new Error("User already exists with this email address");
    error.statusCode = 400;
    throw error;
  }

  const user = await userModel.createUser(userData);
  const token = generateToken(user.id);

  return {
    id: user.id,
    _id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    phone: user.phone,
    avatar: user.avatar,
    token,
  };
};

const loginUser = async (email, password) => {
  const user = await userModel.getUserByEmail(email);
  if (!user || !(await userModel.matchPassword(password, user.password))) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  const token = generateToken(user.id);

  return {
    id: user.id,
    _id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    phone: user.phone,
    avatar: user.avatar,
    token,
  };
};

const getUserById = async (id) => {
  const user = await userModel.getUserById(id);
  if (!user) return null;

  const { password, ...userWithoutPassword } = user;
  return {
    ...userWithoutPassword,
    _id: user.id,
  };
};

const updateUserProfile = async (id, updateData) => {
  const user = await userModel.getUserById(id);
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  const updatedUser = await userModel.updateUser(id, updateData);

  return {
    id: updatedUser.id,
    _id: updatedUser.id,
    name: updatedUser.name,
    email: updatedUser.email,
    role: updatedUser.role,
    phone: updatedUser.phone,
    avatar: updatedUser.avatar,
  };
};

module.exports = {
  createUser,
  loginUser,
  getUserById,
  updateUserProfile,
};
