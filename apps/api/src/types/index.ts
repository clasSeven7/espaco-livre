export interface Alocador {
  nome_usuario: string;
  senha: string;
  email: string;
  telefone?: string;
  idade?: number;
  endereco_residencial?: string;
  cidade?: string;
  cpf?: string;
  cep?: string;
}

export interface AlocadorData {
  email: string;
  senha: string;
  nome_usuario: string;
  telefone: string;
  idade: number;
  endereco_residencial: string;
  cidade: string;
  cpf: string;
  cep: string;
}

export interface AlocadorResponse extends AlocadorData {
  id: number;
  criado_em: Date;
  atualizado_em: Date;
}

export interface Cliente {
  nome_usuario: string;
  senha: string;
  email: string;
  telefone?: string;
  idade?: number;
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
  telefone: string;
  idade: number;
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
export interface AlocadorCreate extends Partial<AlocadorData> {
  email: string;
  senha: string;
  nome_usuario: string;
}

export interface ClienteCreate extends Partial<ClienteData> {
  email: string;
  senha: string;
  nome_usuario: string;
}
