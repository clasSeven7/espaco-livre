CREATE TABLE IF NOT EXISTS locatarios (
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

CREATE TRIGGER atualizacao_locatarios_atualizado_em
  BEFORE UPDATE ON locatarios
  FOR EACH ROW
  EXECUTE FUNCTION atualizacao_atualizada_na_coluna(); 