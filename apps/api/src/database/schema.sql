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
  foto_de_perfil TEXT,
  nome_usuario VARCHAR(100) NOT NULL,
  senha TEXT NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  telefone VARCHAR(20),
  data_de_nascimento VARCHAR(10) CHECK (data_de_nascimento ~ '^\d{2}/\d{2}/\d{4}$'),
  endereco_residencial TEXT,
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
  foto_de_perfil TEXT,
  nome_usuario VARCHAR(100) NOT NULL,
  senha TEXT NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  telefone VARCHAR(20),
  data_de_nascimento VARCHAR(10) CHECK (data_de_nascimento ~ '^\d{2}/\d{2}/\d{4}$'),
  endereco_residencial TEXT,
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
  recursos_imovel TEXT DEFAULT '',
  fotos_imovel TEXT DEFAULT '',
  cidade VARCHAR(100) NOT NULL,
  rua VARCHAR(120) NOT NULL,
  bairro VARCHAR(100),
  observacoes TEXT,
  disponivel_24h BOOLEAN DEFAULT FALSE,
  hora_fim TIME,
  hora_inicio TIME,
  todos_dias BOOLEAN DEFAULT FALSE,
  dias_disponiveis VARCHAR(50),
  valor_imovel DECIMAL(10,2) NOT NULL,
  taxa_limpeza DECIMAL(10,2) DEFAULT 0.00,
  metodos_pagamento TEXT DEFAULT '',
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER trg_espacos_update
BEFORE UPDATE ON espacos
FOR EACH ROW
EXECUTE FUNCTION atualiza_timestamp();
-- =======================
-- PERFIL DO CLIENTE
-- =======================
DROP TABLE IF EXISTS perfil_cliente CASCADE;
CREATE TABLE perfil_cliente (
  id SERIAL PRIMARY KEY,
  cliente_id INT UNIQUE NOT NULL REFERENCES clientes(id) ON DELETE CASCADE,
  frequencia_uso VARCHAR(50),    
  intensidade_uso VARCHAR(100),     
  tipo_espaco_preferido VARCHAR(100),    
  tempo_medio_por_sessao INTERVAL,      
  ultima_alocacao DATE,                   
  criado_em TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER trg_perfil_cliente_update
BEFORE UPDATE ON perfil_cliente
FOR EACH ROW
EXECUTE FUNCTION atualiza_timestamp();

-- =======================
-- PERFIL DO LOCATÁRIO
-- =======================
DROP TABLE IF EXISTS perfil_locatario CASCADE;
CREATE TABLE perfil_locatario (
  id SERIAL PRIMARY KEY,
  locatario_id INT UNIQUE NOT NULL REFERENCES locatarios(id) ON DELETE CASCADE,
  frequencia_uso VARCHAR(50),
  intensidade_uso VARCHAR(100),
  tipo_espaco_preferido VARCHAR(100),
  tempo_medio_por_sessao INTERVAL,
  ultima_locacao DATE,
  criado_em TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER trg_perfil_locatario_update
BEFORE UPDATE ON perfil_locatario
FOR EACH ROW
EXECUTE FUNCTION atualiza_timestamp();

-- =======================
-- COMENTÁRIOS
-- =======================
DROP TABLE IF EXISTS comentarios CASCADE;
CREATE TABLE comentarios (
  id SERIAL PRIMARY KEY,
  nome_usuario VARCHAR(100) NOT NULL,
  cargo VARCHAR(50) NOT NULL,
  nota INT CHECK (nota >= 1 AND nota <= 5),
  comentario TEXT NOT NULL,
  criado_em TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
CREATE TRIGGER trg_comentarios_update
BEFORE UPDATE ON comentarios
FOR EACH ROW
EXECUTE FUNCTION atualiza_timestamp();