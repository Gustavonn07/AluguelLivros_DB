const express = require('express')
const router = express.Router()

const clientController = require('../controllers/ClientController.js')

/**
 * @swagger
 * tags:
 *   name: Clients
 *   description: Gerenciamento de clientes
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Client:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: João da Silva
 *         email:
 *           type: string
 *           example: joao@email.com
 *         cpf:
 *           type: string
 *           example: "12345678900"
 *         telephone:
 *           type: string
 *           example: "(85) 99999-9999"
 *         address:
 *           type: string
 *           example: Rua A, 123
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/v1/clients/register:
 *   post:
 *     summary: Cadastra um novo cliente
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - name
 *               - email
 *               - cpf
 *               - telephone
 *               - address
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               cpf:
 *                 type: string
 *               telephone:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       201:
 *         description: Cliente criado com sucesso
 *       400:
 *         description: Erro de validação
 *       409:
 *         description: E-mail ou CPF já cadastrado
 */
router.post('/register', clientController.createClient)

/**
 * @swagger
 * /api/v1/clients:
 *   get:
 *     summary: Lista todos os clientes
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Listagem de clientes bem-sucedida
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Client'
 *       404:
 *         description: Nenhum cliente encontrado
 */
router.get('/', clientController.getAllClients)

/**
 * @swagger
 * /api/v1/clients/{cpf}:
 *   get:
 *     summary: Busca um cliente pelo CPF
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cpf
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cliente encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Client'
 *       404:
 *         description: Cliente não existente
 */
router.get('/:cpf', clientController.getClientByCPF)

/**
 * @swagger
 * /api/v1/clients/cpf/{cpf}:
 *   put:
 *     summary: Atualiza os dados de um cliente pelo CPF
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cpf
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               telephone:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cliente atualizado com sucesso
 *       404:
 *         description: Cliente não encontrado
 */
router.put('/cpf/:cpf', clientController.editClient)

/**
 * @swagger
 * /api/v1/clients/cpf/{cpf}:
 *   delete:
 *     summary: Remove um cliente pelo CPF
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cpf
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cliente removido com sucesso
 *       409:
 *         description: Cliente possui histórico de aluguéis
 *       404:
 *         description: Cliente não encontrado
 */
router.delete('/cpf/:cpf', clientController.deleteClient)

module.exports = router
