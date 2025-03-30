-- Criar o banco de dados
CREATE DATABASE espaco_livre_db;

-- Conectar ao banco de dados
\c espaco_livre_db;

-- Schema da tabela de Clientes
CREATE TABLE IF NOT EXISTS clientes (
  id SERIAL PRIMARY KEY,
  nome_usuario VARCHAR(100) NOT NULL,
  senha VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  telefone VARCHAR(20),
  idade INTEGER NOT NULL,
  endereco_residencial TEXT,
  cidade VARCHAR(100),
  cep VARCHAR(8),
  tipo_ocupacao VARCHAR(50),
  frequencia_uso VARCHAR(50),
  criado_em TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Trigger para atualizar o atualizado_em automaticamente
CREATE OR REPLACE FUNCTION atualizacao_atualizada_na_coluna()
RETURNS TRIGGER AS $$
BEGIN
  NEW.atualizado_em = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER atualizacao_clientes_atualizado_em
  BEFORE UPDATE ON clientes
  FOR EACH ROW
  EXECUTE FUNCTION atualizacao_atualizada_na_coluna(); 

-- Schema da tabela de Alocadores
CREATE TABLE IF NOT EXISTS alocadores (
  id SERIAL PRIMARY KEY,
  nome_usuario VARCHAR(100) NOT NULL,
  senha VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  telefone VARCHAR(20),
  idade INTEGER,
  endereco_residencial TEXT,
  cidade VARCHAR(100),
  cpf VARCHAR(11) NOT NULL UNIQUE,
  cep VARCHAR(8),
  criado_em TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Trigger para atualizar o updated_at automaticamente
CREATE OR REPLACE FUNCTION atualizacao_atualizada_na_coluna()
RETURNS TRIGGER AS $$
BEGIN
  NEW.atualizado_em = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER atualizacao_alocadores_atualizado_em
  BEFORE UPDATE ON alocadores
  FOR EACH ROW
  EXECUTE FUNCTION atualizacao_atualizada_na_coluna(); 