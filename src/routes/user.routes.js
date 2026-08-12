const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { protect } = require('../middleware/auth.middleware');
const { validateRegister, validateLogin } = require('../middleware/validation.middleware');

// Public routes
router.post('/register', validateRegister, userController.registerUser);
router.post('/login', validateLogin, userController.loginUser);

// Protected routes
router.get('/profile', protect, userController.getUserProfile);
router.put('/profile', protect, userController.updateUserProfile);

module.exports = router;
