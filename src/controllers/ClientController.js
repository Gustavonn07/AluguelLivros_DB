// Importa o serviço responsável pela lógica de negócios relacionada a clientes
import ClientService from '../service/ClientService.js';
const clientService = new ClientService();

/**
 * Controlador de rotas relacionadas a clientes.
 */
// Mudamos de module.exports para a sintaxe ESM:
export const createClient = async (req, res) => {
    const result = await clientService.createClient(req.body);
    res.status(result.type === 'success' ? 201 : 400).json(result);
};

export const getClientByCPF = async (req, res) => {
    const result = await clientService.getClientByCPF(req.params.cpf);
    res.status(result.type === 'success' ? 200 : 404).json(result);
};

export const getAllClients = async (_, res) => {
    const result = await clientService.getAllClients();
    res.status(result.type === 'success' ? 200 : 404).json(result);
};

export const editClient = async (req, res) => {
    const result = await clientService.editClient(req.params.cpf, req.body);
    res.status(result.type === 'success' ? 200 : 400).json(result);
};

export const deleteClient = async (req, res) => {
    const result = await clientService.deleteClient(req.params.cpf);
    res.status(result.type === 'success' ? 200 : 400).json(result);
};

// Caso você prefira exportar como um objeto único (para manter compatibilidade com suas rotas):
export default {
    createClient,
    getClientByCPF,
    getAllClients,
    editClient,
    deleteClient
};