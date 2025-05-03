import { espacoRepository } from '@/repositories/espacoRepository';
import { EspacoData, EspacoResponse } from '@/types/index';

type EspacoSemValorImovel = Omit<EspacoResponse, 'valor_imovel'>;

export const espacoService = {
  async criarEspaco(data: EspacoData) {
    try {
      const espacosExistentes = await espacoRepository.buscarPorLocatario(
        data.locatario_id
      );
      if (espacosExistentes.length > 0) {
        throw {
          status: 409,
          message: 'Espaço já cadastrado para o locatário.',
          field: 'locatario_id',
        };
      }

      const espaco = await espacoRepository.criar(data);
      const { locatario_id, valor_imovel, ...espacoLimpo } = espaco;

      return {
        message: '✅ Espaço cadastrado com sucesso!',
        espaco: espacoLimpo,
      };
    } catch (error: any) {
      console.error('❌ Erro ao criar espaço:', error);
      throw error?.status
        ? error
        : { status: 500, message: '❌ Erro interno ao criar espaço.' };
    }
  },

  async buscarPorId(id: number): Promise<EspacoSemValorImovel> {
    try {
      const espaco = await espacoRepository.buscarPorId(id);
      if (!espaco) {
        throw { status: 404, message: '🔍 Espaço não encontrado.' };
      }

      const { valor_imovel, ...espacoLimpo } = espaco;
      return espacoLimpo;
    } catch (error: any) {
      console.error('❌ Erro ao buscar espaço por ID:', error);
      throw error?.status
        ? error
        : { status: 500, message: '❌ Erro interno ao buscar espaço por ID.' };
    }
  },

  async buscarPorLocatario(
    locatario_id: number
  ): Promise<EspacoSemValorImovel[]> {
    try {
      const espacos = await espacoRepository.buscarPorLocatario(locatario_id);
      return espacos.map(({ valor_imovel, ...resto }) => resto);
    } catch (error: any) {
      console.error('❌ Erro ao buscar espaços do locatário:', error);
      throw error?.status
        ? error
        : {
            status: 500,
            message: '❌ Erro interno ao buscar espaços do locatário.',
          };
    }
  },

  async listarEspacos(): Promise<EspacoSemValorImovel[]> {
    try {
      const espacos = await espacoRepository.listarTodos();
      return espacos.map(({ valor_imovel, ...resto }) => resto);
    } catch (error: any) {
      console.error('❌ Erro ao listar espaços:', error);
      throw error?.status
        ? error
        : { status: 500, message: '❌ Erro interno ao listar espaços.' };
    }
  },

  async atualizarEspaco(id: number, data: Partial<EspacoData>) {
    try {
      const espaco = await espacoRepository.atualizar(id, data);
      const { valor_imovel, ...espacoLimpo } = espaco;

      return {
        message: '✅ Espaço atualizado com sucesso!',
        espaco: espacoLimpo,
      };
    } catch (error: any) {
      console.error('❌ Erro ao atualizar espaço:', error);
      throw error?.status
        ? error
        : { status: 500, message: '❌ Erro interno ao atualizar espaço.' };
    }
  },

  async deletarEspaco(id: number) {
    try {
      await espacoRepository.deletar(id);
      return {
        message: '✅ Espaço deletado com sucesso!',
      };
    } catch (error: any) {
      console.error('❌ Erro ao deletar espaço:', error);
      throw error?.status
        ? error
        : { status: 500, message: '❌ Erro interno ao deletar espaço.' };
    }
  },
};
