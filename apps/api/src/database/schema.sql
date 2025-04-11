-- Criar o banco de dados
CREATE DATABASE espaco_livre_db;

-- Conectar ao banco
\c espaco_livre_db;

-- Função para atualizar automaticamente o campo "atualizado_em"
CREATE OR REPLACE FUNCTION atualiza_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.atualizado_em = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- =======================
-- TABELA DE CLIENTES
-- =======================
DROP TABLE IF EXISTS clientes CASCADE;
CREATE TABLE clientes (
  id SERIAL PRIMARY KEY,
  nome_usuario VARCHAR(100) NOT NULL,
  senha TEXT NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  telefone VARCHAR(20),
  idade INT CHECK (idade >= 16),
  endereco TEXT,
  cidade VARCHAR(100),
  cep CHAR(8) CHECK (cep ~ '^\d{8}$'),
  tipo_ocupacao VARCHAR(50),
  frequencia_uso VARCHAR(50),
  criado_em TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER trg_clientes_update
BEFORE UPDATE ON clientes
FOR EACH ROW
EXECUTE FUNCTION atualiza_timestamp();

-- =======================
-- TABELA DE LOCATÁRIOS
-- =======================
DROP TABLE IF EXISTS locatarios CASCADE;
CREATE TABLE locatarios (
  id SERIAL PRIMARY KEY,
  nome_usuario VARCHAR(100) NOT NULL,
  senha_hash TEXT NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  telefone VARCHAR(20),
  idade INT CHECK (idade >= 16),
  endereco TEXT,
  cidade VARCHAR(100),
  cpf CHAR(11) UNIQUE NOT NULL CHECK (cpf ~ '^\d{11}$'),
  cep CHAR(8) CHECK (cep ~ '^\d{8}$'),
  criado_em TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER trg_locatarios_update
BEFORE UPDATE ON locatarios
FOR EACH ROW
EXECUTE FUNCTION atualiza_timestamp();

-- =======================
-- TABELA DE ESPAÇOS
-- =======================
DROP TABLE IF EXISTS espacos CASCADE;
CREATE TABLE espacos (
  id SERIAL PRIMARY KEY,
  locatario_id INT NOT NULL REFERENCES locatarios(id) ON DELETE CASCADE,
  titulo VARCHAR(100) NOT NULL,
  descricao TEXT,
  cidade VARCHAR(100) NOT NULL,
  rua VARCHAR(120) NOT NULL,
  numero VARCHAR(10),
  bairro VARCHAR(100),
  observacoes TEXT,
  valor DECIMAL(10,2) NOT NULL,
  taxa_limpeza DECIMAL(10,2) DEFAULT 0.00,
  disponivel_24h BOOLEAN DEFAULT FALSE,
  hora_inicio TIME,
  hora_fim TIME,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =======================
-- TABELA DE FOTOS DOS ESPAÇOS
-- =======================
DROP TABLE IF EXISTS fotos CASCADE;
CREATE TABLE fotos (
  id SERIAL PRIMARY KEY,
  espaco_id INT NOT NULL REFERENCES espacos(id) ON DELETE CASCADE,
  url TEXT NOT NULL
);

-- =======================
-- MÉTODOS DE PAGAMENTO
-- =======================
DROP TABLE IF EXISTS metodos_pagamento CASCADE;
CREATE TABLE metodos_pagamento (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(50) UNIQUE NOT NULL
);

-- Associação: espaço <-> métodos de pagamento
DROP TABLE IF EXISTS espaco_pagamentos CASCADE;
CREATE TABLE espaco_pagamentos (
  espaco_id INT NOT NULL REFERENCES espacos(id) ON DELETE CASCADE,
  metodo_id INT NOT NULL REFERENCES metodos_pagamento(id) ON DELETE RESTRICT,
  PRIMARY KEY (espaco_id, metodo_id)
);

-- =======================
-- RECURSOS DISPONÍVEIS
-- =======================
DROP TABLE IF EXISTS recursos CASCADE;
CREATE TABLE recursos (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) UNIQUE NOT NULL
);

-- Associação: espaço <-> recursos
DROP TABLE IF EXISTS espaco_recursos CASCADE;
CREATE TABLE espaco_recursos (
  espaco_id INT NOT NULL REFERENCES espacos(id) ON DELETE CASCADE,
  recurso_id INT NOT NULL REFERENCES recursos(id) ON DELETE RESTRICT,
  PRIMARY KEY (espaco_id, recurso_id)
);
