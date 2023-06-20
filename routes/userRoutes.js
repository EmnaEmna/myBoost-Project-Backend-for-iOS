const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser,

} = require('../controllers/userController')



//const { protect } = require('../middleware/authMiddleware')





/**
 * @swagger
 * tags:
 *   name: User
 *   description: Endpoints for user operations, including authentication and registration
 */

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: User Authentication
 *     description: Authenticates a user with their email and password
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               email: user@example.com
 *               password: password123
 *     responses:
 *       200:
 *         description: Authentication successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 role:
 *                   type: string
 *                 token:
 *                   type: string
 *             example:
 *               _id: 123456789
 *               name: John Doe
 *               email: user@example.com
 *               role: user
 *               token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Invalid credentials
 */
router.post('/login', loginUser)


/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary:  User Registration
 *     description:  Creates a new user account
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *             example:
 *               name: John Doe
 *               email: user@example.com
 *               password: password123
 *               role: user
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 role:
 *                   type: string
 *                 token:
 *                   type: string
 *             example:
 *               _id: 123456789
 *               name: John Doe
 *               email: user@example.com
 *               role: user
 *               token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Error registering user

 */
router.post('/register', registerUser)


module.exports = router
