const express = require('express')
const router = express.Router()

const copyController = require('../controllers/CopyController')

/**
 * @swagger
 * tags:
 *   name: Copies
 *   description: Gerenciamento de cópias de livros
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Copy:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         condition:
 *           type: string
 *           example: Bom
 *         available:
 *           type: boolean
 *           example: true
 *         bar_code:
 *           type: string
 *           example: "ABC123456"
 *         book_id:
 *           type: integer
 *           example: 10
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/v1/copies/register:
 *   post:
 *     summary: Cadastra uma nova cópia
 *     tags: [Copies]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - condition
 *               - bar_code
 *               - book_id
 *             properties:
 *               condition:
 *                 type: string
 *               available:
 *                 type: boolean
 *               bar_code:
 *                 type: string
 *               book_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Cópia criada com sucesso
 *       400:
 *         description: Livro não encontrado ou dados inválidos
 *       409:
 *         description: Cópia já cadastrada (bar_code duplicado)
 */
router.post('/register', copyController.createCopy)

/**
 * @swagger
 * /api/v1/copies:
 *   get:
 *     summary: Lista todas as cópias
 *     tags: [Copies]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Listagem de cópias bem-sucedida
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Copy'
 *       404:
 *         description: Nenhuma cópia encontrada
 */
router.get('/', copyController.getAllCopies)

/**
 * @swagger
 * /api/v1/copies/{id}:
 *   get:
 *     summary: Busca uma cópia pelo ID
 *     tags: [Copies]
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
 *         description: Cópia encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Copy'
 *       404:
 *         description: Cópia não existente
 */
router.get('/:id', copyController.getCopyById)

/**
 * @swagger
 * /api/v1/copies/{id}:
 *   put:
 *     summary: Atualiza os dados de uma cópia
 *     tags: [Copies]
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
 *               condition:
 *                 type: string
 *               available:
 *                 type: boolean
 *               bar_code:
 *                 type: string
 *               book_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Cópia atualizada com sucesso
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Cópia não encontrada
 */
router.put('/:id', copyController.editCopy)

/**
 * @swagger
 * /api/v1/copies/{id}:
 *   delete:
 *     summary: Remove uma cópia pelo ID
 *     tags: [Copies]
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
 *         description: Cópia deletada com sucesso
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Cópia não encontrada
 */
router.delete('/:id', copyController.deleteCopy)

module.exports = router
