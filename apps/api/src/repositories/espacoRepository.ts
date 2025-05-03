import DB from '@/database/index';
import { Espaco, EspacoResponse } from '@/types/index';

function truncarCampos(espaco: Espaco): Espaco {
  return {
    ...espaco,
    titulo: espaco.titulo.substring(0, 100),
    descricao: espaco.descricao?.substring(0, 255),
    cidade: espaco.cidade.substring(0, 100),
    rua: espaco.rua.substring(0, 100),
    bairro: espaco.bairro?.substring(0, 100),
    observacoes: espaco.observacoes?.substring(0, 255),
    valor_imovel: espaco.valor_imovel,
    taxa_limpeza: espaco.taxa_limpeza ?? 0,
    disponivel_24h: espaco.disponivel_24h ?? false,
    hora_inicio: espaco.hora_inicio || undefined,
    hora_fim: espaco.hora_fim || undefined,
    recursos_imovel: espaco.recursos_imovel,
    fotos_imovel: espaco.fotos_imovel,
    metodos_pagamento: espaco.metodos_pagamento,
    todos_dias: espaco.todos_dias ?? false,
    dias_disponiveis: espaco.dias_disponiveis?.substring(0, 50),
  };
}

export const espacoRepository = {
  async criar(espaco: Espaco): Promise<EspacoResponse> {
    try {
      if (
        !espaco.locatario_id ||
        !espaco.titulo ||
        !espaco.cidade ||
        !espaco.rua ||
        !espaco.valor_imovel
      ) {
        throw { status: 400, message: '❌ Dados obrigatórios não fornecidos.' };
      }

      const dados = truncarCampos(espaco);

      const query = `
        INSERT INTO espacos (
          locatario_id, titulo, descricao, cidade, rua, bairro, observacoes,
          valor_imovel, taxa_limpeza, disponivel_24h, hora_inicio, hora_fim, 
          todos_dias, dias_disponiveis, recursos_imovel, fotos_imovel, metodos_pagamento
        ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)
        RETURNING *;
      `;

      const values = [
        dados.locatario_id,
        dados.titulo,
        dados.descricao || null,
        dados.cidade,
        dados.rua,
        dados.bairro || null,
        dados.observacoes || null,
        dados.valor_imovel,
        dados.taxa_limpeza ?? 0,
        dados.disponivel_24h ?? false,
        dados.hora_inicio || null,
        dados.hora_fim || null,
        dados.todos_dias ?? false, // Novo campo
        dados.dias_disponiveis || '', // Novo campo
        dados.recursos_imovel,
        dados.fotos_imovel,
        dados.metodos_pagamento,
      ];

      const result = await DB.query(query, values);

      if (!result.rows.length) {
        throw {
          status: 500,
          message: '❌ Erro ao criar espaço no banco de dados.',
        };
      }

      return result.rows[0];
    } catch (error) {
      console.error('🔴 Erro ao criar espaço:', error);
      throw error;
    }
  },

  async buscarPorId(id: number): Promise<EspacoResponse | null> {
    try {
      const espacoRes = await DB.query('SELECT * FROM espacos WHERE id = $1;', [
        id,
      ]);
      if (!espacoRes.rows.length) return null;

      return {
        ...espacoRes.rows[0],
        recursos_imovel: JSON.parse(espacoRes.rows[0].recursos_imovel),
        fotos_imovel: JSON.parse(espacoRes.rows[0].fotos_imovel),
        metodos_pagamento: JSON.parse(espacoRes.rows[0].metodos_pagamento),
      };
    } catch (error) {
      console.error('🔴 Erro ao buscar espaço por ID:', error);
      throw error;
    }
  },

  async buscarPorLocatario(locatario_id: number): Promise<EspacoResponse[]> {
    try {
      const espacosRes = await DB.query(
        'SELECT * FROM espacos WHERE locatario_id = $1;',
        [locatario_id]
      );
      const espacos = espacosRes.rows;

      const result = await Promise.all(
        espacos.map(async (espaco) => {
          return await this.buscarPorId(espaco.id);
        })
      );

      return result.filter((espaco) => espaco !== null) as EspacoResponse[];
    } catch (error) {
      console.error('🔴 Erro ao buscar espaços do locatário:', error);
      throw error;
    }
  },

  async atualizar(id: number, data: Partial<Espaco>): Promise<EspacoResponse> {
    try {
      const dados = truncarCampos(data as Espaco);

      const camposAtualizaveis = [
        'titulo',
        'descricao',
        'cidade',
        'rua',
        'bairro',
        'observacoes',
        'valor_imovel',
        'taxa_limpeza',
        'disponivel_24h',
        'hora_inicio',
        'hora_fim',
        'recursos_imovel',
        'fotos_imovel',
        'metodos_pagamento',
        'todos_dias', // Novo campo
        'dias_disponiveis', // Novo campo
      ];

      const camposParaAtualizar = Object.keys(dados).filter((campo) =>
        camposAtualizaveis.includes(campo as keyof Espaco)
      );

      if (!camposParaAtualizar.length) {
        throw {
          status: 400,
          message: '⚠️ Nenhum campo válido para atualizar.',
        };
      }

      const query = `
        UPDATE espacos 
        SET ${camposParaAtualizar
          .map((campo, idx) => `${campo} = $${idx + 2}`)
          .join(', ')}
        WHERE id = $1
        RETURNING *
      `;

      const values = [
        id,
        ...camposParaAtualizar.map((campo) => dados[campo as keyof Espaco]),
      ];

      const result = await DB.query(query, values);

      if (!result.rows.length) {
        throw { status: 404, message: '⚠️ Espaço não encontrado.' };
      }

      return result.rows[0];
    } catch (error) {
      console.error('🔴 Erro ao atualizar espaço:', error);
      throw error;
    }
  },

  async buscarPorCidade(cidade: string): Promise<EspacoResponse[]> {
    try {
      const query = 'SELECT * FROM espacos WHERE cidade = $1';
      const result = await DB.query(query, [cidade]);
      return result.rows.map((row) => ({
        ...row,
        recursos_imovel: JSON.parse(row.recursos_imovel),
        fotos_imovel: JSON.parse(row.fotos_imovel),
        metodos_pagamento: JSON.parse(row.metodos_pagamento),
      }));
    } catch (error) {
      console.error('🔴 Erro ao buscar espaços por cidade:', error);
      throw error;
    }
  },

  async buscarPorBairro(bairro: string): Promise<EspacoResponse[]> {
    try {
      const query = 'SELECT * FROM espacos WHERE bairro = $1';
      const result = await DB.query(query, [bairro]);
      return result.rows.map((row) => ({
        ...row,
        recursos_imovel: JSON.parse(row.recursos_imovel),
        fotos_imovel: JSON.parse(row.fotos_imovel),
        metodos_pagamento: JSON.parse(row.metodos_pagamento),
      }));
    } catch (error) {
      console.error('🔴 Erro ao buscar espaços por bairro:', error);
      throw error;
    }
  },

  async listarTodos(): Promise<EspacoResponse[]> {
    try {
      const query = 'SELECT * FROM espacos ORDER BY criado_em DESC';
      const result = await DB.query(query);
      return result.rows.map((row) => ({
        ...row,
        recursos_imovel: JSON.parse(row.recursos_imovel),
        fotos_imovel: JSON.parse(row.fotos_imovel),
        metodos_pagamento: JSON.parse(row.metodos_pagamento),
      }));
    } catch (error) {
      console.error('🔴 Erro ao listar espaços:', error);
      throw error;
    }
  },

  async deletar(id: number): Promise<void> {
    try {
      const query = 'DELETE FROM espacos WHERE id = $1';
      const result = await DB.query(query, [id]);
      if (result.rowCount === 0) {
        throw { status: 404, message: '⚠️ Espaço não encontrado.' };
      }
      console.log(`✅ Espaço com ID ${id} deletado com sucesso.`);
    } catch (error) {
      console.error('🔴 Erro ao deletar espaço:', error);
      throw error;
    }
  },
};
