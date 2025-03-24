import pool from '../config/database';

interface Cliente {
  nome_usuario: string;
  senha: string;
  email: string;
  telefone?: string;
  idade?: number;
  endereco_residencial?: string;
  cidade?: string;
  cep?: string;
  ocupacao?: string;
  tipo_ocupacao?: string;
  frequencia_uso?: string;
}

export const clienteRepository = {
  async criar(cliente: Cliente) {
    const query = `
      INSERT INTO clientes (
        nome_usuario, senha, email, telefone, idade, 
        endereco_residencial, cidade, cep, ocupacao, 
        tipo_ocupacao, frequencia_uso
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING *
    `;

    const values = [
      cliente.nome_usuario,
      cliente.senha,
      cliente.email,
      cliente.telefone,
      cliente.idade,
      cliente.endereco_residencial,
      cliente.cidade,
      cliente.cep,
      cliente.ocupacao,
      cliente.tipo_ocupacao,
      cliente.frequencia_uso,
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  },

  async buscarPorEmail(email: string) {
    const query = 'SELECT * FROM clientes WHERE email = $1';
    const result = await pool.query(query, [email]);
    return result.rows[0];
  },
};
