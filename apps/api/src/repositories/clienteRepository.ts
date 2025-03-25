import DB from '../database/index';
import { Cliente, ClienteResponse } from '../types/index';

export const clienteRepository = {
  async criar(cliente: Cliente): Promise<ClienteResponse> {
    try {
      // Validações básicas
      if (!cliente.nome_usuario || !cliente.senha || !cliente.email) {
        throw new Error('Dados obrigatórios não fornecidos');
      }

      // Trunca strings muito longas
      const dadosTruncados = {
        ...cliente,
        nome_usuario: cliente.nome_usuario.substring(0, 100),
        email: cliente.email.substring(0, 255),
        telefone: cliente.telefone?.substring(0, 20),
        cidade: cliente.cidade?.substring(0, 100),
        cep: cliente.cep?.substring(0, 8),
        tipo_ocupacao: cliente.tipo_ocupacao?.substring(0, 50),
        frequencia_uso: cliente.frequencia_uso?.substring(0, 50),
      };

      const query = `
        INSERT INTO clientes (
          nome_usuario, senha, email, telefone, idade, 
          endereco_residencial, cidade, cep, 
          tipo_ocupacao, frequencia_uso
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
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
        dadosTruncados.cep,
        dadosTruncados.tipo_ocupacao,
        dadosTruncados.frequencia_uso,
      ];

      const result = await DB.query(query, values);

      if (!result.rows[0]) {
        throw new Error('Erro ao criar cliente no banco de dados');
      }

      return result.rows[0];
    } catch (error) {
      console.error('Erro no repositório ao criar cliente:', error);
      throw error;
    }
  },

  async buscarPorEmail(email: string): Promise<ClienteResponse | null> {
    try {
      const query = 'SELECT * FROM clientes WHERE email = $1';
      const result = await DB.query(query, [email]);
      return result.rows[0] || null;
    } catch (error) {
      console.error('Erro no repositório ao buscar cliente por email:', error);
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
      console.error(
        'Erro no repositório ao buscar cliente por nome de usuário:',
        error
      );
      throw error;
    }
  },

  async buscarPorId(id: number): Promise<ClienteResponse | null> {
    try {
      const query = 'SELECT * FROM clientes WHERE id = $1';
      const result = await DB.query(query, [id]);
      return result.rows[0] || null;
    } catch (error) {
      console.error('Erro no repositório ao buscar cliente por id:', error);
      throw error;
    }
  },

  async listarTodos(): Promise<ClienteResponse[]> {
    try {
      const query = 'SELECT * FROM clientes ORDER BY nome_usuario';
      const result = await DB.query(query);
      return result.rows;
    } catch (error) {
      console.error('Erro no repositório ao listar clientes:', error);
      throw error;
    }
  },

  async atualizar(
    id: number,
    data: Partial<Cliente>
  ): Promise<ClienteResponse> {
    try {
      const camposAtualizaveis = [
        'nome_usuario',
        'email',
        'telefone',
        'idade',
        'endereco_residencial',
        'cidade',
        'cep',
        'tipo_ocupacao',
        'frequencia_uso',
        'senha',
      ];

      const camposParaAtualizar = camposAtualizaveis.filter(
        (campo) => data[campo as keyof Cliente] !== undefined
      );

      if (camposParaAtualizar.length === 0) {
        throw new Error('Nenhum campo para atualizar');
      }

      const query = `
        UPDATE clientes 
        SET ${camposParaAtualizar
          .map((campo, index) => `${campo} = $${index + 2}`)
          .join(', ')}
        WHERE id = $1
        RETURNING *
      `;

      const values = [
        id,
        ...camposParaAtualizar.map((campo) => data[campo as keyof Cliente]),
      ];

      const result = await DB.query(query, values);

      if (!result.rows[0]) {
        throw new Error('Cliente não encontrado');
      }

      return result.rows[0];
    } catch (error) {
      console.error('Erro no repositório ao atualizar cliente:', error);
      throw error;
    }
  },

  async deletar(id: number): Promise<void> {
    try {
      const query = 'DELETE FROM clientes WHERE id = $1';
      const result = await DB.query(query, [id]);

      if (result.rowCount === 0) {
        throw new Error('Cliente não encontrado');
      }
    } catch (error) {
      console.error('Erro no repositório ao deletar cliente:', error);
      throw error;
    }
  },
};
