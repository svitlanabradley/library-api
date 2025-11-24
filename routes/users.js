const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');
const { isAuthenticated } = require('../middleware/authenticate');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: List of all users
 *       401:
 *         description: Unauthorized
 * 
 *   post:
 *     summary: Add a new user
 *     tags: [Users]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 example: "john@example.com"
 *               memberSince:
 *                 type: string
 *                 example: "2025-01-01"
 *               favoriteGenre:
 *                 type: string
 *                 example: "Fantasy"
 *               borrowedBooks:
 *                 type: array
 *                 items:
 *                   type: string
 *               isActive:
 *                 type: boolean
 *                 example: true
 *               role:
 *                 type: string
 *                 example: "member"
 *     responses:
 *       201:
 *         description: User successfully added
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Validation failed
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User details
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 * 
 *   put:
 *     summary: Update a user by ID
 *     tags: [Users]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
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
 *               memberSince:
 *                 type: string
 *               favoriteGenre:
 *                 type: string
 *               borrowedBooks:
 *                 type: array
 *                 items:
 *                   type: string
 *               isActive:
 *                 type: boolean
 *               role:
 *                 type: string
 *     responses:
 *       204:
 *         description: User successfully updated
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 * 
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       204:
 *         description: User successfully deleted
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */

router.get('/', isAuthenticated, usersController.getAll);
router.post('/', isAuthenticated, usersController.createUser);
router.get('/:id', isAuthenticated, usersController.getSingle);
router.put('/:id', isAuthenticated, usersController.updateUser);
router.delete('/:id', isAuthenticated, usersController.deleteUser);

module.exports = router;








// const express = require('express');
// const router = express.Router();
// const usersController = require('../controllers/users');

// const { isAuthenticated } = require('../middleware/authenticate');

// /**
//  * @swagger
//  * tags:
//  *   name: Users
//  *   description: User management
//  */

// /**
//  * @swagger
//  * /users:
//  *   get:
//  *     summary: Get all users
//  *     tags: [Users]
//  *     responses:
//  *       200:
//  *         description: List of all users
//  * 
//  *   post:
//  *     summary: Add a new user
//  *     tags: [Users]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - name
//  *               - email
//  *             properties:
//  *               name:
//  *                 type: string
//  *                 example: "John Doe"
//  *               email:
//  *                 type: string
//  *                 example: "john@example.com"
//  *               memberSince:
//  *                 type: string
//  *                 example: "2025-01-01"
//  *               favoriteGenre:
//  *                 type: string
//  *                 example: "Fantasy"
//  *               borrowedBooks:
//  *                 type: array
//  *                 items:
//  *                   type: string
//  *               isActive:
//  *                 type: boolean
//  *                 example: true
//  *               role:
//  *                 type: string
//  *                 example: "member"
//  *     responses:
//  *       201:
//  *         description: User successfully added
//  *       400:
//  *         description: Validation failed
//  *       500:
//  *         description: Server error
//  */

// router.get('/', usersController.getAll);
// router.post('/', isAuthenticated, usersController.createUser);

// /**
//  * @swagger
//  * /users/{id}:
//  *   get:
//  *     summary: Get a user by ID
//  *     tags: [Users]
//  *     parameters:
//  *       - name: id
//  *         in: path
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: User ID
//  *     responses:
//  *       200:
//  *         description: User details
//  *       404:
//  *         description: User not found
//  * 
//  *   put:
//  *     summary: Update a user by ID
//  *     tags: [Users]
//  *     parameters:
//  *       - name: id
//  *         in: path
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: User ID
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               name:
//  *                 type: string
//  *               email:
//  *                 type: string
//  *               memberSince:
//  *                 type: string
//  *               favoriteGenre:
//  *                 type: string
//  *               borrowedBooks:
//  *                 type: array
//  *                 items:
//  *                   type: string
//  *               isActive:
//  *                 type: boolean
//  *               role:
//  *                 type: string
//  *     responses:
//  *       204:
//  *         description: User successfully updated
//  *       404:
//  *         description: User not found
//  * 
//  *   delete:
//  *     summary: Delete a user by ID
//  *     tags: [Users]
//  *     parameters:
//  *       - name: id
//  *         in: path
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: User ID
//  *     responses:
//  *       204:
//  *         description: User successfully deleted
//  *       404:
//  *         description: User not found
//  */
// router.get('/:id', usersController.getSingle);
// router.put('/:id', isAuthenticated, usersController.updateUser);
// router.delete('/:id', isAuthenticated, usersController.deleteUser);

// module.exports = router;