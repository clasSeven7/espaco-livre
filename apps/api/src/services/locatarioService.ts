import { locatarioRepository } from '@/repositories/locatarioRepository';
import { LocatarioData, LocatarioResponse } from '@/types/index';

export const locatarioService = {
  async criarLocatario(data: LocatarioData) {
    try {
      // Verifica se já existe um locatario com o mesmo email
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

      // Verifica se já existe um locatario com o mesmo CPF
      const cpfExistente = await locatarioRepository.buscarPorCpf(data.cpf);
      if (cpfExistente) {
        throw {
          status: 409,
          message: '🆔 CPF já cadastrado',
          field: 'cpf',
        };
      }

      // Cria o locatario no banco de dados
      const locatario = await locatarioRepository.criar(data);

      // Remove a senha do objeto retornado
      const { senha, ...locatarioSemSenha } = locatario as LocatarioResponse;

      return {
        message: '✅ Locatario cadastrado com sucesso',
        locatario: locatarioSemSenha,
      };
    } catch (error: any) {
      if (error.status) {
        throw error;
      }
      throw {
        status: 500,
        message: '❌ Erro ao criar locatario no banco de dados',
      };
    }
  },

  async buscarPorId(id: number) {
    try {
      const locatario = await locatarioRepository.buscarPorId(id);
      if (!locatario) {
        throw {
          status: 404,
          message: '🔍 Locatario não encontrado',
        };
      }
      return locatario;
    } catch (error: any) {
      if (error.status) {
        throw error;
      }
      throw {
        status: 500,
        message: '❌ Erro ao buscar locatario',
      };
    }
  },

  async listarTodos() {
    try {
      return await locatarioRepository.listarTodos();
    } catch (error) {
      throw {
        status: 500,
        message: '❌ Erro ao listar os locatarios',
      };
    }
  },

  async atualizar(id: number, data: Partial<LocatarioData>) {
    try {
      const locatario = await locatarioRepository.atualizar(id, data);
      return locatario;
    } catch (error: any) {
      if (error.status) {
        throw error;
      }
      throw {
        status: 500,
        message: '❌ Erro ao atualizar locatario',
      };
    }
  },

  async deletar(id: number) {
    try {
      await locatarioRepository.deletar(id);
      return { message: '🗑️ Locatario deletado com sucesso' };
    } catch (error: any) {
      if (error.status) {
        throw error;
      }
      throw {
        status: 500,
        message: '❌ Erro ao deletar locatario',
      };
    }
  },
};
