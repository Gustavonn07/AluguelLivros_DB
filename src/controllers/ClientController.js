const ClientService = require('../service/ClientService.js');
const clientService = new ClientService();

const createClient = async (req, res) => {
  const result = await clientService.createClient(req.body)
  res.status(result.type === 'success' ? 201 : 400).json(result)
}

const getClientByCPF = async (req, res) => {
  const result = await clientService.getClientByCPF(req.params.cpf)
  res.status(result.type === 'success' ? 200 : 404).json(result)
}

const getAllClients = async (_req, res) => {
  const result = await clientService.getAllClients()
  res.status(result.type === 'success' ? 200 : 404).json(result)
}

const editClient = async (req, res) => {
  const result = await clientService.editClient(req.params.cpf, req.body)
  res.status(result.type === 'success' ? 200 : 400).json(result)
}

const deleteClient = async (req, res) => {
  const result = await clientService.deleteClient(req.params.cpf)
  res.status(result.type === 'success' ? 200 : 400).json(result)
}

module.exports = {
  createClient,
  getClientByCPF,
  getAllClients,
  editClient,
  deleteClient
}