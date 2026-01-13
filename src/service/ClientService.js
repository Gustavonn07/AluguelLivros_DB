// src/service/ClientService.js
import { PrismaClient } from "@prisma/client";
import { clienteSchema } from "../shared/cliente.schema.js";
import { validateCPF } from "../shared/cpfValidation.js";

const prisma = new PrismaClient();

class ClientService {
  /**
   * Retorna os dados de um cliente específico pelo ID.
   * @param {string|number} id
   */
  async getClientByCPF(cpf) {
    try {
      const client = await prisma.client.findUnique({
        where: { cpf },
      });

      if (!client) {
        return {
          type: "error",
          message: "Cliente não existente.",
        };
      }

      return {
        type: "success",
        message: "Cliente encontrado.",
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
      };
    } catch (error) {
      console.error("Erro ao buscar cliente:", error);
      throw error;
    }
  }

  /**
   * Retorna todos os clientes cadastrados.
   */
  async getAllClients() {
    try {
      const clients = await prisma.client.findMany();

      if (!clients.length) {
        return {
          type: "error",
          message: "Nenhum cliente encontrado.",
        };
      }

      return {
        type: "success",
        message: "Listagem de clientes bem-sucedida.",
        data: clients.map((client) => ({
          name: client.name,
          email: client.email,
          cpf: client.cpf,
          telephone: client.telephone,
          address: client.address,
          createdAt: client.createdAt,
          updatedAt: client.updatedAt,
        })),
      };
    } catch (error) {
      console.error("Erro ao listar clientes:", error);
      throw error;
    }
  }

  /**
   * Cria um novo cliente.
   * @param {object} data
   */
  async createClient(data) {
    try {
      // Validação com Yup
      try {
        await clienteSchema.validate(data, { abortEarly: false });
      } catch (validationError) {
        return {
          type: "error",
          message: "Erro de validação.",
          errors: validationError.errors,
        };
      }

      // Validação de CPF
      if (!validateCPF(data.cpf)) {
        return {
          type: "error",
          message: "CPF inválido.",
        };
      }

      // Verifica duplicidade
      const existingClient = await prisma.client.findFirst({
        where: {
          OR: [{ email: data.email }, { cpf: data.cpf }],
        },
      });

      if (existingClient) {
        return {
          type: "error",
          message: "E-mail ou CPF já cadastrado.",
        };
      }

      const newClient = await prisma.client.create({
        data: {
          name: data.name,
          email: data.email,
          cpf: data.cpf,
          telephone: data.telephone,
          address: data.address,
        },
      });

      return {
        type: "success",
        message: "Cliente criado com sucesso.",
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
      };
    } catch (error) {
      console.error("Erro ao criar cliente:", error);
      throw error;
    }
  }

  /**
   * Atualiza os dados de um cliente.
   */
  async editClient(cpf, data) {
  try {
    // Busca o cliente pelo CPF
    const client = await prisma.client.findUnique({
      where: { cpf },  // aqui usamos o CPF
    });

    if (!client) {
      return {
        type: "error",
        message: "Cliente não encontrado para atualização.",
      };
    }

    // Valida CPF se ele estiver sendo alterado
    if (data.cpf && !validateCPF(data.cpf)) {
      return {
        type: "error",
        message: "CPF inválido.",
      };
    }

    // Verifica se o novo email ou CPF já estão em uso por outro cliente
    if (data.email || data.cpf) {
      const existingClient = await prisma.client.findFirst({
        where: {
          OR: [
            data.email ? { email: data.email } : undefined,
            data.cpf ? { cpf: data.cpf } : undefined,
          ].filter(Boolean),
        },
      });

      if (existingClient && existingClient.cpf !== cpf) {
        return {
          type: "error",
          message: "E-mail ou CPF já está em uso por outro cliente.",
        };
      }
    }

    // Atualiza o cliente
    const updatedClient = await prisma.client.update({
      where: { cpf },  // atualiza usando CPF
      data,
    });

    return {
      type: "success",
      message: "Cliente atualizado com sucesso.",
      data: {
        id: updatedClient.client_id,
        name: updatedClient.name,
        email: updatedClient.email,
        cpf: updatedClient.cpf,
        telephone: updatedClient.telephone,
        address: updatedClient.address,
        createdAt: updatedClient.createdAt,
        updatedAt: updatedClient.updatedAt,
      },
    };
  } catch (error) {
    console.error("Erro ao editar cliente:", error);
    throw error;
  }
}

  /**
   * Remove um cliente se ele não tiver algueis ativos
   */
  async deleteClient(cpf) {
    try {
      const client = await prisma.client.findUnique({
        where: { cpf },
        include: { rentals: true },
      });

      if (!client) {
        return {
          type: "error",
          message: "Cliente não encontrado.",
        };
      }

      if (client.rentals.length > 0) {
        return {
          type: "error",
          message: "Cliente possui histórico de aluguéis e não pode ser removido.",
        };
      }

      await prisma.client.delete({
        where: { cpf },
      });

      return {
        type: "success",
        message: "Cliente removido com sucesso.",
      };
    } catch (error) {
      console.error("Erro ao deletar cliente:", error);
      throw error;
    }
  }
}

export default ClientService;