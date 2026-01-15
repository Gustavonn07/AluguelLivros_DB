const { PrismaClient } = require('@prisma/client')
const clienteSchema = require('../shared/schemas/clienteSchema.js')
const { validateCPF } = require('../shared/cpfValidation.js')

const prisma = new PrismaClient()

class ClientService {
  /**
   * Retorna os dados de um cliente específico pelo CPF.
   * @param {string} cpf
   */
  async getClientByCPF(cpf) {
    try {
      const client = await prisma.client.findUnique({
        where: { cpf },
      })

      if (!client) {
        return {
          type: 'error',
          message: 'Cliente não existente.',
        }
      }

      return {
        type: 'success',
        message: 'Cliente encontrado.',
        data: {
          id: client.client_id,
          name: client.name,
          email: client.email,
          cpf: client.cpf,
          telephone: client.telephone,
          address: client.address,
          createdAt: client.createdAt,
          updatedAt: client.updatedAt,
        },
      }
    } catch (error) {
      console.error('Erro ao buscar cliente:', error)
      throw error
    }
  }

  /**
   * Retorna todos os clientes cadastrados.
   */
  async getAllClients() {
    try {
      const clients = await prisma.client.findMany()

      if (!clients.length) {
        return {
          type: 'error',
          message: 'Nenhum cliente encontrado.',
        }
      }

      return {
        type: 'success',
        message: 'Listagem de clientes bem-sucedida.',
        data: clients.map(client => ({
          name: client.name,
          email: client.email,
          cpf: client.cpf,
          telephone: client.telephone,
          address: client.address,
          createdAt: client.createdAt,
          updatedAt: client.updatedAt,
        })),
      }
    } catch (error) {
      console.error('Erro ao listar clientes:', error)
      throw error
    }
  }

  /**
   * Cria um novo cliente.
   * @param {object} data
   */
  async createClient(data) {
    try {
      try {
        await clienteSchema.validate(data, { abortEarly: false })
        } catch (err) {
        if (err.name === 'ValidationError') {
            return {
            type: 'error',
            message: 'Erro de validação.',
            errors: err.errors,
            }
        }

        throw err
        }

      const existingClient = await prisma.client.findFirst({
        where: {
          OR: [{ email: data.email }, { cpf: data.cpf }],
        },
      })

      if (existingClient) {
        return {
          type: 'error',
          message: 'E-mail ou CPF já cadastrado.',
        }
      }

      const newClient = await prisma.client.create({
        data: {
          name: data.name,
          email: data.email,
          cpf: data.cpf,
          telephone: data.telephone,
          address: data.address,
        },
      })

      return {
        type: 'success',
        message: 'Cliente criado com sucesso.',
        data: {
          id: newClient.client_id,
          name: newClient.name,
          email: newClient.email,
          cpf: newClient.cpf,
          telephone: newClient.telephone,
          address: newClient.address,
          createdAt: newClient.createdAt,
          updatedAt: newClient.updatedAt,
        },
      }
    } catch (error) {
      console.error('Erro ao criar cliente:', error)
      throw error
    }
  }

  /**
   * Atualiza os dados de um cliente.
   */
  async editClient(cpf, data) {
    try {
        if (!cpf) {
            return {
                type: 'error',
                message: 'CPF é obrigatório para edição.',
            }
        }

        const client = await prisma.client.findUnique({
            where: { cpf },
        })

        if (!client) {
            return {
                type: 'error',
                message: 'Cliente não encontrado para atualização.',
            }
        }

        const updatedClient = await prisma.client.update({
            where: { cpf },
            data,
        })

        return {
            type: 'success',
            message: 'Cliente atualizado com sucesso.',
            data: updatedClient,
        }
    } catch (error) {
        console.error('Erro ao editar cliente:', error)
        throw error
    }
  }

  /**
   * Remove um cliente se não tiver aluguéis ativos
   */
  async deleteClient(cpf) {
    try {
      const client = await prisma.client.findUnique({
        where: { cpf },
        include: { rentals: true },
      })

      if (!client) {
        return {
          type: 'error',
          message: 'Cliente não encontrado.',
        }
      }

      if (client.rentals.length > 0) {
        return {
          type: 'error',
          message: 'Cliente possui histórico de aluguéis e não pode ser removido.',
        }
      }

      await prisma.client.delete({
        where: { cpf },
      })

      return {
        type: 'success',
        message: 'Cliente removido com sucesso.',
      }
    } catch (error) {
      console.error('Erro ao deletar cliente:', error)
      throw error
    }
  }
}

module.exports = ClientService
