export interface Locatario {
  nome_usuario: string;
  senha: string;
  email: string;
  telefone?: string;
  data_de_nascimento?: number;
  endereco_residencial?: string;
  cidade?: string;
  cpf?: string;
  cep?: string;
}

export interface LocatarioData {
  email: string;
  senha: string;
  nome_usuario: string;
  telefone: string;
  data_de_nascimento: number;
  endereco_residencial: string;
  cidade: string;
  cpf: string;
  cep: string;
}

export interface LocatarioResponse extends LocatarioData {
  id: number;
  criado_em: Date;
  atualizado_em: Date;
}

export interface Cliente {
  nome_usuario: string;
  senha: string;
  email: string;
  telefone?: string;
  foto_de_perfil?: string;
  data_de_nascimento?: number;
  endereco_residencial?: string;
  cidade?: string;
  cep?: string;
  tipo_ocupacao?: string;
  frequencia_uso?: string;
}

export interface ClienteData {
  email: string;
  senha: string;
  nome_usuario: string;
  foto_de_perfil?: string;
  telefone: string;
  data_de_nascimento: number;
  endereco_residencial: string;
  cidade: string;
  cep: string;
  tipo_ocupacao:
    | 'startup'
    | 'influencer'
    | 'produtor'
    | 'gerente'
    | 'freelancer'
    | 'fotografo';
  frequencia_uso: 'ocasional' | 'semanal' | 'diario' | 'mensal';
}

export interface ClienteResponse extends ClienteData {
  id: number;
  criado_em: Date;
  atualizado_em: Date;
}

// Interfaces para criação com campos opcionais
export interface LocatarioCreate extends Partial<LocatarioData> {
  email: string;
  senha: string;
  nome_usuario: string;
}

export interface ClienteCreate extends Partial<ClienteData> {
  email: string;
  senha: string;
  nome_usuario: string;
}
