const express = require('express')
const router = express.Router()

const clientController = require('../controllers/ClientController.js')

router.post('/register', clientController.createClient)
router.get('/:cpf', clientController.getClientByCPF)
router.get('/', clientController.getAllClients)
router.put('/:id', clientController.editClient)
router.delete('/cpf/:cpf', clientController.deleteClient);
router.put('/cpf/:cpf', clientController.editClient);

module.exports = router
