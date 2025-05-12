import DB from '@/database/index';
import {Cliente, ClienteResponse} from '@/types';

function truncarCampos(cliente: Cliente): Cliente {
  return {
    ...cliente,
    nome_usuario: cliente.nome_usuario?.substring(0, 100),
    email: cliente.email?.substring(0, 255),
    telefone: cliente.telefone?.substring(0, 20),
    cidade: cliente.cidade?.substring(0, 100),
    cep: cliente.cep?.substring(0, 8),
    tipo_ocupacao: cliente.tipo_ocupacao?.substring(0, 50),
    frequencia_uso: cliente.frequencia_uso?.substring(0, 50),
  };
}

export const clienteRepository = {
  async criar(cliente: Cliente): Promise<ClienteResponse> {
    try {
      if (!cliente.nome_usuario || !cliente.senha || !cliente.email) {
        throw {status: 400, message: '❌ Dados obrigatórios não fornecidos.'};
      }

      const dados = truncarCampos(cliente);

      const query = `
          INSERT INTO clientes (foto_de_perfil, nome_usuario, senha, email, telefone,
                                data_de_nascimento, endereco_residencial, cidade, cep,
                                tipo_ocupacao, frequencia_uso)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
          RETURNING *
      `;

      const values = [
        dados.foto_de_perfil || null,
        dados.nome_usuario,
        dados.senha,
        dados.email,
        dados.telefone || null,
        dados.data_de_nascimento || null,
        dados.endereco_residencial || null,
        dados.cidade || null,
        dados.cep || null,
        dados.tipo_ocupacao || null,
        dados.frequencia_uso || null,
      ];

      const result = await DB.query(query, values);

      if (!result.rows.length) {
        throw {
          status: 500,
          message: '❌ Erro ao criar cliente no banco de dados.',
        };
      }

      return result.rows[0];
    } catch (error) {
      console.error('🔴 Erro ao criar cliente:', error);
      throw error;
    }
  },

  async buscarPorEmail(email: string): Promise<ClienteResponse | null> {
    try {
      const query = 'SELECT * FROM clientes WHERE email = $1';
      const result = await DB.query(query, [email]);
      return result.rows[0] || null;
    } catch (error) {
      console.error('🚨 Erro ao buscar cliente por email:',
        error
      );
      throw error;
    }
  },

  async buscarPorNomeUsuario(
    nome_usuario: string
  ): Promise<ClienteResponse | null> {
    try {
      const query = 'SELECT * FROM clientes WHERE nome_usuario = $1';
      const result = await DB.query(query, [nome_usuario]);
      return result.rows[0] || null;
    } catch (error) {
      console.error('🔴 Erro ao buscar cliente por nome de usuário:', error);
      throw error;
    }
  },

  async buscarPorId(id: number): Promise<ClienteResponse | null> {
    try {
      const query = 'SELECT * FROM clientes WHERE id = $1';
      const result = await DB.query(query, [id]);
      return result.rows[0] || null;
    } catch (error) {
      console.error('🔴 Erro ao buscar cliente por ID:',
        error
      );
      throw error;
    }
  },

  async listarTodos(): Promise<ClienteResponse[]> {
    try {
      const query = 'SELECT * FROM clientes ORDER BY nome_usuario';
      const result = await DB.query(query);
      return result.rows;
    } catch (error) {
      console.error('🔴 Erro ao listar clientes:', error);
      throw error;
    }
  },

  async atualizar(
    id: number,
    data: Partial<Cliente>
  ): Promise<ClienteResponse> {
    try {
      const dados = truncarCampos(data as Cliente);

      const camposAtualizaveis = [
        'foto_de_perfil',
        'nome_usuario',
        'email',
        'telefone',
        'data_de_nascimento',
        'endereco_residencial',
        'cidade',
        'cep',
        'tipo_ocupacao',
        'frequencia_uso',
        'senha',
      ];

      const camposParaAtualizar = camposAtualizaveis.filter(
        (campo) => dados[campo as keyof Cliente] !== undefined
      );

      if (!camposParaAtualizar.length) {
        throw {status: 400, message: '⚠️ Nenhum campo para atualizar.'};
      }

      const query = `
          UPDATE clientes
          SET ${camposParaAtualizar
          .map((campo, idx) => `${campo} = $${idx + 2}`)
          .join(', ')}
          WHERE id = $1
          RETURNING *
      `;

      const values = [
        id,
        ...camposParaAtualizar.map((campo) => dados[campo as keyof Cliente]),
      ];

      const result = await DB.query(query, values);

      if (!result.rows.length) {
        throw {status: 404, message: '❌ Cliente não encontrado.'};
      }

      return result.rows[0];
    } catch (error) {
      console.error('🔴 Erro ao atualizar cliente:', error);
      throw error;
    }
  },

  async deletar(id: number): Promise<void> {
    try {
      const query = 'DELETE FROM clientes WHERE id = $1';
      const result = await DB.query(query, [id]);

      if (!result.rowCount) {
        throw {
          status: 404,
          message: '❌ Cliente não encontrado para exclusão.',
        };
      }
    } catch (error) {
      console.error('🔴 Erro ao deletar cliente:', error);
      throw error;
    }
  },
};
