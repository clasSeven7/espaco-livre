import pool from '../config/database';
import { Alocador, AlocadorResponse } from '../types/index';

export const alocadorRepository = {
  async criar(alocador: Alocador): Promise<AlocadorResponse> {
    try {
      // Validações básicas
      if (
        !alocador.nome_usuario ||
        !alocador.senha ||
        !alocador.email ||
        !alocador.cpf
      ) {
        throw new Error('Dados obrigatórios não fornecidos');
      }

      // Trunca strings muito longas
      const dadosTruncados = {
        ...alocador,
        nome_usuario: alocador.nome_usuario.substring(0, 100),
        email: alocador.email.substring(0, 255),
        telefone: alocador.telefone?.substring(0, 20),
        cidade: alocador.cidade?.substring(0, 100),
        cpf: alocador.cpf.substring(0, 11),
        cep: alocador.cep?.substring(0, 8),
      };

      const query = `
        INSERT INTO alocadores (
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

      const result = await pool.query(query, values);

      if (!result.rows[0]) {
        throw new Error('Erro ao criar alocador no banco de dados');
      }

      return result.rows[0];
    } catch (error) {
      console.error('Erro no repositório ao criar alocador:', error);
      throw error;
    }
  },

  async buscarPorEmail(email: string): Promise<AlocadorResponse | null> {
    try {
      const query = 'SELECT * FROM alocadores WHERE email = $1';
      const result = await pool.query(query, [email]);
      return result.rows[0] || null;
    } catch (error) {
      console.error('Erro no repositório ao buscar alocador por email:', error);
      throw error;
    }
  },

  async buscarPorCpf(cpf: string): Promise<AlocadorResponse | null> {
    try {
      const query = 'SELECT * FROM alocadores WHERE cpf = $1';
      const result = await pool.query(query, [cpf]);
      return result.rows[0] || null;
    } catch (error) {
      console.error('Erro no repositório ao buscar alocador por CPF:', error);
      throw error;
    }
  },

  async buscarPorId(id: number): Promise<AlocadorResponse | null> {
    try {
      const query = 'SELECT * FROM alocadores WHERE id = $1';
      const result = await pool.query(query, [id]);
      return result.rows[0] || null;
    } catch (error) {
      console.error('Erro no repositório ao buscar alocador por id:', error);
      throw error;
    }
  },

  async listarTodos(): Promise<AlocadorResponse[]> {
    try {
      const query = 'SELECT * FROM alocadores ORDER BY nome_usuario';
      const result = await pool.query(query);
      return result.rows;
    } catch (error) {
      console.error('Erro no repositório ao listar alocadores:', error);
      throw error;
    }
  },

  async atualizar(
    id: number,
    data: Partial<Alocador>
  ): Promise<AlocadorResponse> {
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
        (campo) => data[campo as keyof Alocador] !== undefined
      );

      if (camposParaAtualizar.length === 0) {
        throw new Error('Nenhum campo para atualizar');
      }

      const query = `
        UPDATE alocadores 
        SET ${camposParaAtualizar
          .map((campo, index) => `${campo} = $${index + 2}`)
          .join(', ')}
        WHERE id = $1
        RETURNING *
      `;

      const values = [
        id,
        ...camposParaAtualizar.map((campo) => data[campo as keyof Alocador]),
      ];

      const result = await pool.query(query, values);

      if (!result.rows[0]) {
        throw new Error('Alocador não encontrado');
      }

      return result.rows[0];
    } catch (error) {
      console.error('Erro no repositório ao atualizar alocador:', error);
      throw error;
    }
  },

  async deletar(id: number): Promise<void> {
    try {
      const query = 'DELETE FROM alocadores WHERE id = $1';
      const result = await pool.query(query, [id]);

      if (result.rowCount === 0) {
        throw new Error('Alocador não encontrado');
      }
    } catch (error) {
      console.error('Erro no repositório ao deletar alocador:', error);
      throw error;
    }
  },
};
