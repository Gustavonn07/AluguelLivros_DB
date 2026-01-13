const express = require('express')
const router = express.Router()

// Importa controller
const clientController = require('../controllers/ClientController.js')

// Rotas de clientes

router.post('/', clientController.createClient)
router.get('/:cpf', clientController.getClientByCPF)
router.get('/', clientController.getAllClients)
router.put('/:id', clientController.editClient)
router.delete('/cpf/:cpf', clientController.deleteClient);
router.put('/cpf/:cpf', clientController.editClient);


module.exports = router
