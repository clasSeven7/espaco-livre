import { clienteRepository } from '@/repositories/clienteRepository';
import { ClienteData, ClienteResponse } from '@/types/index';

export const clienteService = {
  async criarCliente(data: ClienteData) {
    try {
      const clienteExistente = await clienteRepository.buscarPorEmail(
        data.email
      );
      if (clienteExistente) {
        throw {
          status: 409,
          message: 'Email já cadastrado.',
          field: 'email',
        };
      }

      const cliente = await clienteRepository.criar(data);
      const { senha, ...clienteSemSenha } = cliente as ClienteResponse;

      return {
        message: '✅ Cliente cadastrado com sucesso!',
        cliente: clienteSemSenha,
      };
    } catch (error: any) {
      console.error('❌ Erro ao criar cliente:', error);
      throw error.status
        ? error
        : {
            status: 500,
            message: '❌ Erro interno ao criar cliente.',
          };
    }
  },

  async buscarPorEmail(email: string) {
    try {
      return await clienteRepository.buscarPorEmail(email);
    } catch (error: any) {
      console.error('❌ Erro ao buscar cliente por email:', error);
      throw {
        status: 500,
        message: '❌ Erro interno ao buscar cliente por email.',
      };
    }
  },

  async buscarPorId(id: number): Promise<Omit<ClienteResponse, 'senha'>> {
    try {
      const cliente = await clienteRepository.buscarPorId(id);
      if (!cliente) {
        throw {
          status: 404,
          message: '🔍 Cliente não encontrado.',
        };
      }

      const { senha, ...clienteSemSenha } = cliente;
      return clienteSemSenha;
    } catch (error: any) {
      console.error('❌ Erro ao buscar cliente por ID:', error);
      throw error.status
        ? error
        : {
            status: 500,
            message: '❌ Erro interno ao buscar cliente por ID.',
          };
    }
  },

  async listarClientes(): Promise<Omit<ClienteResponse, 'senha'>[]> {
    try {
      const clientes = await clienteRepository.listarTodos();
      return clientes.map(({ senha, ...cliente }) => cliente);
    } catch (error: any) {
      console.error('❌ Erro ao listar clientes:', error);
      throw {
        status: 500,
        message: '❌ Erro interno ao listar clientes.',
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
          message: '🔍 Cliente não encontrado.',
        };
      }

      const clienteAtualizado = await clienteRepository.atualizar(id, data);
      const { senha, ...clienteSemSenha } = clienteAtualizado;
      return clienteSemSenha;
    } catch (error: any) {
      console.error('❌ Erro ao atualizar cliente:', error);
      throw error.status
        ? error
        : {
            status: 500,
            message: '❌ Erro interno ao atualizar cliente.',
          };
    }
  },

  async deletarCliente(id: number): Promise<void> {
    try {
      const cliente = await clienteRepository.buscarPorId(id);
      if (!cliente) {
        throw {
          status: 404,
          message: '🔍 Cliente não encontrado.',
        };
      }

      await clienteRepository.deletar(id);
    } catch (error: any) {
      console.error('❌ Erro ao deletar cliente:', error);
      throw error.status
        ? error
        : {
            status: 500,
            message: '❌ Erro interno ao deletar cliente.',
          };
    }
  },
};
