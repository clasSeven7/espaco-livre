import {locatarioRepository} from '@/repositories/locatarioRepository';
import {LocatarioData, LocatarioResponse} from '@/types';

export const locatarioService = {
  async criarLocatario(data: LocatarioData) {
    try {
      const locatarioExistente = await locatarioRepository.buscarPorEmail(
        data.email
      );
      if (locatarioExistente) {
        throw {
          status: 409,
          message: '📧 Email já cadastrado',
          field: 'email',
        };
      }

      const cpfExistente = await locatarioRepository.buscarPorCpf(data.cpf);
      if (cpfExistente) {
        throw {
          status: 409,
          message: '🆔 CPF já cadastrado',
          field: 'cpf',
        };
      }

      const locatario = await locatarioRepository.criar(data);
      const {senha, ...locatarioSemSenha} = locatario as LocatarioResponse;

      return {
        message: '✅ Locatario cadastrado com sucesso',
        locatario: locatarioSemSenha,
      };
    } catch (error: any) {
      console.error('❌ Erro ao criar locatario:', error);
      throw error.status
        ? error
        : {
          status: 500,
          message: '❌ Erro interno ao criar locatario.',
        };
    }
  },

  async buscarPorId(id: number): Promise<Omit<LocatarioResponse, 'senha'>> {
    try {
      const locatario = await locatarioRepository.buscarPorId(id);
      if (!locatario) {
        throw {
          status: 404,
          message: '🔍 Locatario não encontrado',
        };
      }

      const {senha, ...locatarioSemSenha} = locatario;
      return locatarioSemSenha;
    } catch (error: any) {
      console.error('❌ Erro ao buscar locatario por ID:', error);
      throw error.status
        ? error
        : {
          status: 500,
          message: '❌ Erro interno ao buscar locatario por ID.',
        };
    }
  },

  async listarLocatarios() {
    try {
      const locatarios = await locatarioRepository.listarTodos();
      return locatarios.map(({senha, ...locatario}) => locatario);
    } catch (error: any) {
      console.error('❌ Erro ao listar locatario:', error);
      throw {
        status: 500,
        message: '❌ Erro interno ao listar locatario.',
      };
    }
  },

  async atualizarLocatario(
    id: number,
    data: Partial<LocatarioData>
  ): Promise<Omit<LocatarioResponse, 'senha'>> {
    try {
      const cliente = await locatarioRepository.buscarPorId(id);
      if (!cliente) {
        throw {
          status: 404,
          message: '🔍 Locatário não encontrado.',
        };
      }

      const locatarioAtualizado = await locatarioRepository.atualizar(id, data);
      const {senha, ...locatarioSemSenha} = locatarioAtualizado;
      return locatarioSemSenha;
    } catch (error: any) {
      console.error('❌ Erro ao atualizar locatário:', error);
      throw error.status
        ? error
        : {
          status: 500,
          message: '❌ Erro interno ao atualizar locatário.',
        };
    }
  },

  async deletarLocatario(id: number) {
    try {
      const cliente = await locatarioRepository.buscarPorId(id);
      if (!cliente) {
        throw {
          status: 404,
          message: '🔍 Cliente não encontrado.',
        };
      }

      await locatarioRepository.deletar(id);
    } catch (error: any) {
      console.error('❌ Erro ao deletar locatário:', error);
      throw error.status
        ? error
        : {
          status: 500,
          message: '❌ Erro interno ao deletar locatário.',
        };
    }
  },
};
