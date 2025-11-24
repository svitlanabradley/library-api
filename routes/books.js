const express = require('express');
const router = express.Router();
const booksController = require('../controllers/books');
const { isAuthenticated } = require('../middleware/authenticate');

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: Book management
 */

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get all books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: List of all books
 * 
 *   post:
 *     summary: Add a new book
 *     tags: [Books]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - author
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Harry Potter"
 *               author:
 *                 type: string
 *                 example: "J.K. Rowling"
 *               genre:
 *                 type: string
 *                 example: "Fantasy"
 *               year:
 *                 type: integer
 *                 example: 1997
 *               pages:
 *                 type: integer
 *                 example: 309
 *               language:
 *                 type: string
 *                 example: "English"
 *               isbn:
 *                 type: string
 *                 example: "978-0747532743"
 *     responses:
 *       201:
 *         description: Book successfully added
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Validation failed
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Get a book by ID
 *     tags: [Books]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Book ID
 *     responses:
 *       200:
 *         description: Book details
 *       404:
 *         description: Book not found
 * 
 *   put:
 *     summary: Update a book by ID
 *     tags: [Books]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Book ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               genre:
 *                 type: string
 *               year:
 *                 type: integer
 *               pages:
 *                 type: integer
 *               language:
 *                 type: string
 *               isbn:
 *                 type: string
 *               available:
 *                 type: boolean
 *     responses:
 *       204:
 *         description: Book successfully updated
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Book not found
 * 
 *   delete:
 *     summary: Delete a book by ID
 *     tags: [Books]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Book ID
 *     responses:
 *       204:
 *         description: Book successfully deleted
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Book not found
 */

router.get('/', booksController.getAll);
router.post('/', isAuthenticated, booksController.createBook);
router.get('/:id', booksController.getSingle);
router.put('/:id', isAuthenticated, booksController.updateBook);
router.delete('/:id', isAuthenticated, booksController.deleteBook);

module.exports = router;









// const express = require('express');
// const router = express.Router();
// const booksController = require('../controllers/books');

// const { isAuthenticated } = require('../middleware/authenticate');


// /**
//  * @swagger
//  * tags:
//  *   name: Books
//  *   description: Book management
//  */

// /**
//  * @swagger
//  * /books:
//  *   get:
//  *     summary: Get all books
//  *     tags: [Books]
//  *     responses:
//  *       200:
//  *         description: List of all books
//  * 
//  *   post:
//  *     summary: Add a new book
//  *     tags: [Books]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - title
//  *               - author
//  *             properties:
//  *               title:
//  *                 type: string
//  *                 example: "Harry Potter"
//  *               author:
//  *                 type: string
//  *                 example: "J.K. Rowling"
//  *               genre:
//  *                 type: string
//  *                 example: "Fantasy"
//  *               year:
//  *                 type: integer
//  *                 example: 1997
//  *               pages:
//  *                 type: integer
//  *                 example: 309
//  *               language:
//  *                 type: string
//  *                 example: "English"
//  *               isbn:
//  *                 type: string
//  *                 example: "978-0747532743"
//  *     responses:
//  *       201:
//  *         description: Book successfully added
//  *       400:
//  *         description: Validation failed
//  *       500:
//  *         description: Server error
//  */
// router.get('/', booksController.getAll);
// router.post('/', isAuthenticated, booksController.createBook);

// /**
//  * @swagger
//  * /books/{id}:
//  *   get:
//  *     summary: Get a book by ID
//  *     tags: [Books]
//  *     parameters:
//  *       - name: id
//  *         in: path
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: Book ID
//  *     responses:
//  *       200:
//  *         description: Book details
//  *       404:
//  *         description: Book not found
//  * 
//  *   put:
//  *     summary: Update a book by ID
//  *     tags: [Books]
//  *     parameters:
//  *       - name: id
//  *         in: path
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: Book ID
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               title:
//  *                 type: string
//  *               author:
//  *                 type: string
//  *               genre:
//  *                 type: string
//  *               year:
//  *                 type: integer
//  *               pages:
//  *                 type: integer
//  *               language:
//  *                 type: string
//  *               isbn:
//  *                 type: string
//  *               available:
//  *                 type: boolean
//  *     responses:
//  *       204:
//  *         description: Book successfully updated
//  *       404:
//  *         description: Book not found
//  * 
//  *   delete:
//  *     summary: Delete a book by ID
//  *     tags: [Books]
//  *     parameters:
//  *       - name: id
//  *         in: path
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: Book ID
//  *     responses:
//  *       204:
//  *         description: Book successfully deleted
//  *       404:
//  *         description: Book not found
//  */
// router.get('/:id', booksController.getSingle);
// router.put('/:id', isAuthenticated, booksController.updateBook);
// router.delete('/:id', isAuthenticated, booksController.deleteBook);

// module.exports = router;