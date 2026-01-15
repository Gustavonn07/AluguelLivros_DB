const express = require('express')
const router = express.Router()
const bookController = require('../controllers/BookController')

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: Gerenciamento de livros
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Author:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: J. R. R. Tolkien
 *
 *     Book:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         title:
 *           type: string
 *           example: O Hobbit
 *         isbn:
 *           type: string
 *           example: "9788533613379"
 *         publication_year:
 *           type: integer
 *           example: 1937
 *         publisher:
 *           type: string
 *           example: HarperCollins
 *         authorId:
 *           type: integer
 *           example: 1
 *         author:
 *           $ref: '#/components/schemas/Author'
 */

/**
 * @swagger
 * /api/v1/books/register:
 *   post:
 *     summary: Cadastra um novo livro
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - title
 *               - isbn
 *               - authorId
 *             properties:
 *               title:
 *                 type: string
 *               isbn:
 *                 type: string
 *               publication_year:
 *                 type: integer
 *               publisher:
 *                 type: string
 *               authorId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Livro criado com sucesso
 *       400:
 *         description: Dados inválidos ou autor não encontrado
 */
router.post('/register', bookController.createBook)

/**
 * @swagger
 * /api/v1/books:
 *   get:
 *     summary: Lista todos os livros
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Listagem de livros realizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 *       404:
 *         description: Nenhum livro encontrado
 */
router.get('/', bookController.getAllBooks)

/**
 * @swagger
 * /api/v1/books/{id}:
 *   get:
 *     summary: Busca um livro pelo ID
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Livro encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Livro não encontrado
 */
router.get('/:id', bookController.getBookById)

/**
 * @swagger
 * /api/v1/books/{id}:
 *   put:
 *     summary: Atualiza um livro existente
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               title:
 *                 type: string
 *               isbn:
 *                 type: string
 *               publication_year:
 *                 type: integer
 *               publisher:
 *                 type: string
 *     responses:
 *       200:
 *         description: Livro atualizado com sucesso
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Livro não encontrado
 */
router.put('/:id', bookController.editBook)

/**
 * @swagger
 * /api/v1/books/{id}:
 *   delete:
 *     summary: Remove um livro pelo ID
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Livro deletado com sucesso
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Livro não encontrado
 */
router.delete('/:id', bookController.deleteBook)

module.exports = router
