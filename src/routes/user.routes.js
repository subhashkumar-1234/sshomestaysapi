const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { protect } = require('../middleware/auth.middleware');
const { validateRegister, validateLogin } = require('../middleware/validation.middleware');

/**
 * @openapi
 * tags:
 *   name: Authentication & User
 *   description: User registration, login, and profile management API
 */

/**
 * @openapi
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication & User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterInput'
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       400:
 *         description: Validation error or user already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/register', validateRegister, userController.registerUser);

/**
 * @openapi
 * /api/users/login:
 *   post:
 *     summary: Login user & get JWT Token
 *     tags: [Authentication & User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginInput'
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       401:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/login', validateLogin, userController.loginUser);

/**
 * @openapi
 * /api/users/profile:
 *   get:
 *     summary: Get current authenticated user profile
 *     tags: [Authentication & User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       401:
 *         description: Unauthorized - missing or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/profile', protect, userController.getUserProfile);

/**
 * @openapi
 * /api/users/profile:
 *   put:
 *     summary: Update current authenticated user profile
 *     tags: [Authentication & User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               avatar:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       401:
 *         description: Unauthorized
 */
router.put('/profile', protect, userController.updateUserProfile);

module.exports = router;

