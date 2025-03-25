import { alocadorRepository } from '../repositories/alocadorRepository';
import { AlocadorData, AlocadorResponse } from '../types/index';

export const alocadorService = {
  async criarAlocador(data: AlocadorData) {
    try {
      // Verifica se já existe um alocador com o mesmo email
      const alocadorExistente = await alocadorRepository.buscarPorEmail(
        data.email
      );
      if (alocadorExistente) {
        throw {
          status: 409,
          message: 'Email já cadastrado',
          field: 'email',
        };
      }

      // Verifica se já existe um alocador com o mesmo CPF
      const cpfExistente = await alocadorRepository.buscarPorCpf(data.cpf);
      if (cpfExistente) {
        throw {
          status: 409,
          message: 'CPF já cadastrado',
          field: 'cpf',
        };
      }

      // Cria o alocador no banco de dados
      const alocador = await alocadorRepository.criar(data);

      // Remove a senha do objeto retornado
      const { senha, ...alocadorSemSenha } = alocador as AlocadorResponse;

      return {
        message: 'Alocador cadastrado com sucesso',
        alocador: alocadorSemSenha,
      };
    } catch (error: any) {
      if (error.status) {
        throw error;
      }
      throw {
        status: 500,
        message: 'Erro ao criar alocador no banco de dados',
      };
    }
  },

  async buscarPorId(id: number) {
    try {
      const alocador = await alocadorRepository.buscarPorId(id);
      if (!alocador) {
        throw {
          status: 404,
          message: 'Alocador não encontrado',
        };
      }
      return alocador;
    } catch (error: any) {
      if (error.status) {
        throw error;
      }
      throw {
        status: 500,
        message: 'Erro ao buscar alocador',
      };
    }
  },

  async listarTodos() {
    try {
      return await alocadorRepository.listarTodos();
    } catch (error) {
      throw {
        status: 500,
        message: 'Erro ao listar alocadores',
      };
    }
  },

  async atualizar(id: number, data: Partial<AlocadorData>) {
    try {
      const alocador = await alocadorRepository.atualizar(id, data);
      return alocador;
    } catch (error: any) {
      if (error.status) {
        throw error;
      }
      throw {
        status: 500,
        message: 'Erro ao atualizar alocador',
      };
    }
  },

  async deletar(id: number) {
    try {
      await alocadorRepository.deletar(id);
      return { message: 'Alocador deletado com sucesso' };
    } catch (error: any) {
      if (error.status) {
        throw error;
      }
      throw {
        status: 500,
        message: 'Erro ao deletar alocador',
      };
    }
  },
};
