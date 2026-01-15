const express = require('express')
const router = express.Router()
const rentalController = require('../controllers/RentalController')

/**
 * @swagger
 * tags:
 *   name: Rentals
 *   description: Gerenciamento de aluguéis
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Rental:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         clientCpf:
 *           type: string
 *           example: "12345678900"
 *         copyId:
 *           type: integer
 *           example: 5
 *         rental_date:
 *           type: string
 *           format: date-time
 *         due_date:
 *           type: string
 *           format: date-time
 *         return_date:
 *           type: string
 *           format: date-time
 *           nullable: true
 *         fine_value:
 *           type: number
 *           example: 10.5
 */

/**
 * @swagger
 * /api/v1/rentals/register:
 *   post:
 *     summary: Cria um novo aluguel
 *     tags: [Rentals]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - clientCpf
 *               - copyId
 *               - rental_date
 *               - due_date
 *             properties:
 *               clientCpf:
 *                 type: string
 *               copyId:
 *                 type: integer
 *               rental_date:
 *                 type: string
 *                 format: date-time
 *               due_date:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Aluguel criado com sucesso
 *       400:
 *         description: Dados obrigatórios ausentes
 *       404:
 *         description: Cliente ou cópia não encontrada
 *       409:
 *         description: Cópia já está alugada
 */
router.post('/register', rentalController.createRental)

/**
 * @swagger
 * /api/v1/rentals:
 *   get:
 *     summary: Lista todos os aluguéis
 *     tags: [Rentals]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de aluguéis
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Rental'
 *       404:
 *         description: Nenhum aluguel encontrado
 */
router.get('/', rentalController.getAllRentals)

/**
 * @swagger
 * /api/v1/rentals/{id}:
 *   get:
 *     summary: Busca um aluguel pelo ID
 *     tags: [Rentals]
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
 *         description: Aluguel encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rental'
 *       404:
 *         description: Aluguel não encontrado
 */
router.get('/:id', rentalController.getRentalById)

/**
 * @swagger
 * /api/v1/rentals/{id}/finish:
 *   put:
 *     summary: Finaliza um aluguel
 *     tags: [Rentals]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               fine_value:
 *                 type: number
 *                 example: 5.0
 *     responses:
 *       200:
 *         description: Aluguel finalizado com sucesso
 *       400:
 *         description: Aluguel já finalizado
 *       404:
 *         description: Aluguel não encontrado
 */
router.put('/:id/finish', rentalController.finishRental)

/**
 * @swagger
 * /api/v1/rentals/{id}:
 *   delete:
 *     summary: Remove um aluguel
 *     tags: [Rentals]
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
 *         description: Aluguel removido com sucesso
 *       404:
 *         description: Aluguel não encontrado
 */
router.delete('/:id', rentalController.deleteRental)

module.exports = router
