import DB from '@/database/index';
import { Locatario, LocatarioResponse } from '@/types/index';

export const locatarioRepository = {
  async criar(locatario: Locatario): Promise<LocatarioResponse> {
    try {
      // Validações básicas
      if (
        !locatario.nome_usuario ||
        !locatario.senha ||
        !locatario.email ||
        !locatario.cpf
      ) {
        throw new Error('❌ Dados obrigatórios não fornecidos');
      }

      // Trunca strings muito longas
      const dadosTruncados = {
        ...locatario,
        nome_usuario: locatario.nome_usuario.substring(0, 100),
        email: locatario.email.substring(0, 255),
        telefone: locatario.telefone?.substring(0, 20),
        cidade: locatario.cidade?.substring(0, 100),
        cpf: locatario.cpf.substring(0, 11),
        cep: locatario.cep?.substring(0, 8),
      };

      const query = `
        INSERT INTO locatarios (
          nome_usuario, senha, email, telefone, idade, 
          endereco_residencial, cidade, cpf, cep
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *
      `;

      const values = [
        dadosTruncados.nome_usuario,
        dadosTruncados.senha,
        dadosTruncados.email,
        dadosTruncados.telefone,
        dadosTruncados.idade,
        dadosTruncados.endereco_residencial,
        dadosTruncados.cidade,
        dadosTruncados.cpf,
        dadosTruncados.cep,
      ];

      const result = await DB.query(query, values);

      if (!result.rows[0]) {
        throw new Error('❌ Erro ao criar locatario no banco de dados');
      }

      return result.rows[0];
    } catch (error) {
      console.error('🚨 Erro no repositório ao criar locatario:', error);
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

      if (!result.rows[0]) {
        throw new Error('❌ locatario não encontrado');
      }

      return result.rows[0];
    } catch (error) {
      console.error('🚨 Erro no repositório ao atualizar locatario:', error);
      throw error;
    }
  },

  async deletar(id: number): Promise<void> {
    try {
      const query = 'DELETE FROM locatarios WHERE id = $1';
      const result = await DB.query(query, [id]);

      if (result.rowCount === 0) {
        throw new Error('❌ locatario não encontrado');
      }
    } catch (error) {
      console.error('🚨 Erro no repositório ao deletar locatario:', error);
      throw error;
    }
  },
};
