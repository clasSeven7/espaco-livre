import DB from '@/database/index';
import { Locatario, LocatarioResponse } from '@/types/index';

function truncarCampos(locatario: Locatario): Locatario {
  return {
    ...locatario,
    nome_usuario: locatario.nome_usuario?.substring(0, 100),
    email: locatario.email?.substring(0, 255),
    telefone: locatario.telefone?.substring(0, 20),
    cidade: locatario.cidade?.substring(0, 100),
    cep: locatario.cep?.substring(0, 8),
    cpf: locatario.cpf?.substring(0, 11),
  };
}

export const locatarioRepository = {
  async criar(locatario: Locatario): Promise<LocatarioResponse> {
    try {
      if (!locatario.nome_usuario || !locatario.senha || !locatario.email) {
        throw { status: 400, message: '❌ Dados obrigatórios não fornecidos.' };
      }

      const dados = truncarCampos(locatario);

      const query = `
        INSERT INTO locatarios (
          foto_de_perfil, nome_usuario, senha, email, telefone, data_de_nascimento, 
          endereco_residencial, cidade, cpf, cep
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
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
        dados.cpf,
        dados.cep || null,
      ];

      const result = await DB.query(query, values);

      if (!result.rows.length) {
        throw {
          status: 500,
          message: '❌ Erro ao criar locatário no banco de dados.',
        };
      }

      return result.rows[0];
    } catch (error) {
      console.error('🔴 Erro ao criar locatário:', error);
      throw error;
    }
  },

  async buscarPorEmail(email: string): Promise<LocatarioResponse | null> {
    try {
      const query = 'SELECT * FROM locatarios WHERE email = $1';
      const result = await DB.query(query, [email]);
      return result.rows[0] || null;
    } catch (error) {
      console.error(
        '🚨 Erro no repositório ao buscar locatario por email:',
        error
      );
      throw error;
    }
  },

  async buscarPorNomeUsuario(
    nome_usuario: string
  ): Promise<LocatarioResponse | null> {
    try {
      const query = 'SELECT * FROM locatarios WHERE nome_usuario = $1';
      const result = await DB.query(query, [nome_usuario]);
      return result.rows[0] || null;
    } catch (error) {
      console.error(
        '🚨 Erro no repositório ao buscar locatario por nome de usuário:',
        error
      );
      throw error;
    }
  },

  async buscarPorCpf(cpf: string): Promise<LocatarioResponse | null> {
    try {
      const query = 'SELECT * FROM locatarios WHERE cpf = $1';
      const result = await DB.query(query, [cpf]);
      return result.rows[0] || null;
    } catch (error) {
      console.error(
        '🚨 Erro no repositório ao buscar locatario por CPF:',
        error
      );
      throw error;
    }
  },

  async buscarPorId(id: number): Promise<LocatarioResponse | null> {
    try {
      const query = 'SELECT * FROM locatarios WHERE id = $1';
      const result = await DB.query(query, [id]);
      return result.rows[0] || null;
    } catch (error) {
      console.error(
        '🚨 Erro no repositório ao buscar locatario por id:',
        error
      );
      throw error;
    }
  },

  async listarTodos(): Promise<LocatarioResponse[]> {
    try {
      const query = 'SELECT * FROM locatarios ORDER BY nome_usuario';
      const result = await DB.query(query);
      return result.rows;
    } catch (error) {
      console.error('🚨 Erro no repositório ao listar locatarios:', error);
      throw error;
    }
  },

  async atualizar(
    id: number,
    data: Partial<Locatario>
  ): Promise<LocatarioResponse> {
    try {
      const camposAtualizaveis = [
        'foto_de_perfil',
        'nome_usuario',
        'email',
        'telefone',
        'idade',
        'endereco_residencial',
        'cidade',
        'cpf',
        'cep',
        'senha',
      ];

      const camposParaAtualizar = camposAtualizaveis.filter(
        (campo) => data[campo as keyof Locatario] !== undefined
      );

      if (camposParaAtualizar.length === 0) {
        throw new Error('⚠️ Nenhum campo para atualizar');
      }

      const query = `
        UPDATE locatarios 
        SET ${camposParaAtualizar
          .map((campo, index) => `${campo} = $${index + 2}`)
          .join(', ')}
        WHERE id = $1
        RETURNING *
      `;

      const values = [
        id,
        ...camposParaAtualizar.map((campo) => data[campo as keyof Locatario]),
      ];

      const result = await DB.query(query, values);

      if (!result.rows.length) {
        throw { status: 404, message: '❌ Locatário não encontrado.' };
      }

      return result.rows[0];
    } catch (error) {
      console.error('🔴 Erro ao listar locatario:', error);
      throw error;
    }
  },

  async deletar(id: number): Promise<void> {
    try {
      const query = 'DELETE FROM locatarios WHERE id = $1';
      const result = await DB.query(query, [id]);

      if (!result.rowCount) {
        throw {
          status: 404,
          message: '❌ Locatário não encontrado para exclusão.',
        };
      }
    } catch (error) {
      console.error('🔴 Erro ao deletar locatario:', error);
      throw error;
    }
  },
};
