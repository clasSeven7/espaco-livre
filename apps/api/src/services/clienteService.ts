import { clienteRepository } from '../repositories/clienteRepository';
import { ClienteData, ClienteResponse } from '../types/index';

export const clienteService = {
  async criarCliente(data: ClienteData) {
    try {
      // Verifica se já existe um cliente com o mesmo email
      const clienteExistente = await clienteRepository.buscarPorEmail(
        data.email
      );
      if (clienteExistente) {
        throw {
          status: 409,
          message: 'Email já cadastrado',
          field: 'email',
        };
      }

      // Cria o cliente no banco de dados
      const cliente = await clienteRepository.criar(data);

      // Remove a senha do objeto retornado
      const { senha, ...clienteSemSenha } = cliente as ClienteResponse;

      return {
        message: '✅ Cliente cadastrado com sucesso',
        cliente: clienteSemSenha,
      };
    } catch (error: any) {
      if (error.status) {
        throw error;
      }
      throw {
        status: 500,
        message: '❌ Erro ao criar cliente no banco de dados',
      };
    }
  },

  async buscarPorEmail(email: string) {
    try {
      return await clienteRepository.buscarPorEmail(email);
    } catch (error) {
      throw {
        status: 500,
        message: '❌ Erro ao buscar cliente por email',
      };
    }
  },

  async buscarPorId(id: number): Promise<ClienteResponse> {
    try {
      const cliente = await clienteRepository.buscarPorId(id);
      if (!cliente) {
        throw {
          status: 404,
          message: '🔍 Cliente não encontrado',
        };
      }
      return cliente;
    } catch (error: any) {
      if (error.status) {
        throw error;
      }
      throw {
        status: 500,
        message: '❌ Erro ao buscar cliente',
      };
    }
  },

  async listarClientes(): Promise<Omit<ClienteResponse, 'senha'>[]> {
    try {
      const clientes = await clienteRepository.listarTodos();
      return clientes.map(({ senha, ...cliente }) => cliente);
    } catch (error) {
      throw {
        status: 500,
        message: '❌ Erro ao listar clientes',
      };
    }
  },

  async atualizarCliente(
    id: number,
    data: Partial<ClienteData>
  ): Promise<Omit<ClienteResponse, 'senha'>> {
    try {
      const cliente = await clienteRepository.buscarPorId(id);
      if (!cliente) {
        throw {
          status: 404,
          message: '🔍 Cliente não encontrado',
        };
      }

      const clienteAtualizado = await clienteRepository.atualizar(id, data);
      const { senha, ...clienteSemSenha } = clienteAtualizado;
      return clienteSemSenha;
    } catch (error: any) {
      if (error.status) {
        throw error;
      }
      throw {
        status: 500,
        message: '❌ Erro ao atualizar cliente',
      };
    }
  },

  async deletarCliente(id: number): Promise<void> {
    try {
      const cliente = await clienteRepository.buscarPorId(id);
      if (!cliente) {
        throw {
          status: 404,
          message: '🔍 Cliente não encontrado',
        };
      }
      await clienteRepository.deletar(id);
    } catch (error: any) {
      if (error.status) {
        throw error;
      }
      throw {
        status: 500,
        message: '❌ Erro ao deletar cliente',
      };
    }
  },
};
