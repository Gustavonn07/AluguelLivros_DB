const express = require('express')
const router = express.Router()

const {
  createAuthor,
  getAuthorById,
  getAllAuthors,
  editAuthor,
  deleteAuthor,
} = require('../controllers/AuthorController')

/**
 * @swagger
 * tags:
 *   name: Authors
 *   description: Gerenciamento de autores
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
 *           example: Machado de Assis
 *         nationality:
 *           type: string
 *           example: Brasileira
 *         birth_date:
 *           type: string
 *           format: date
 *           example: 1839-06-21
 *         books:
 *           type: array
 *           items:
 *             type: object
 */

/**
 * @swagger
 * /api/v1/authors/register:
 *   post:
 *     summary: Cadastra um novo autor
 *     tags: [Authors]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - name
 *               - nationality
 *               - birth_date
 *             properties:
 *               name:
 *                 type: string
 *               nationality:
 *                 type: string
 *               birth_date:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Autor criado com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post('/register', createAuthor)

/**
 * @swagger
 * /api/v1/authors:
 *   get:
 *     summary: Lista todos os autores
 *     tags: [Authors]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Listagem de autores realizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Author'
 *       404:
 *         description: Nenhum autor encontrado
 */
router.get('/', getAllAuthors)

/**
 * @swagger
 * /api/v1/authors/{id}:
 *   get:
 *     summary: Busca um autor pelo ID
 *     tags: [Authors]
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
 *         description: Autor encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Author'
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Autor não encontrado
 */
router.get('/:id', getAuthorById)

/**
 * @swagger
 * /api/v1/authors/{id}:
 *   put:
 *     summary: Atualiza um autor existente
 *     tags: [Authors]
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
 *               name:
 *                 type: string
 *               nationality:
 *                 type: string
 *               birth_date:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Autor atualizado com sucesso
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Autor não encontrado
 */
router.put('/:id', editAuthor)

/**
 * @swagger
 * /api/v1/authors/{id}:
 *   delete:
 *     summary: Remove um autor pelo ID
 *     tags: [Authors]
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
 *         description: Autor removido com sucesso
 *       400:
 *         description: ID inválido
 *       409:
 *         description: Autor possui livros cadastrados
 *       404:
 *         description: Autor não encontrado
 */
router.delete('/:id', deleteAuthor)

module.exports = router
