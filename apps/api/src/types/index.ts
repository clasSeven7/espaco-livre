export interface Locatario {
  foto_de_perfil?: string;
  nome_usuario: string;
  senha: string;
  email: string;
  telefone?: string;
  data_de_nascimento?: number;
  endereco_residencial?: string;
  cidade?: string;
  cpf: string;
  cep?: string;
}

export interface LocatarioData {
  foto_de_perfil?: string;
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

export interface LocatarioCreate extends Partial<LocatarioData> {
  email: string;
  senha: string;
  nome_usuario: string;
}

export interface Cliente {
  foto_de_perfil?: string;
  nome_usuario: string;
  senha: string;
  email: string;
  telefone?: string;
  data_de_nascimento?: number;
  endereco_residencial?: string;
  cidade?: string;
  cep?: string;
  tipo_ocupacao?: string;
  frequencia_uso?: string;
}

export interface ClienteData {
  foto_de_perfil?: string;
  email: string;
  senha: string;
  nome_usuario: string;
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

export interface ClienteCreate extends Partial<ClienteData> {
  email: string;
  senha: string;
  nome_usuario: string;
}

export interface Espaco {
  locatario_id: number;
  titulo: string;
  descricao?: string;
  cidade: string;
  rua: string;
  bairro?: string;
  observacoes?: string;
  valor_imovel: number;
  taxa_limpeza: number;
  disponivel_24h: boolean;
  hora_inicio?: string;
  hora_fim?: string;
  recursos_imovel: string[];
  fotos_imovel: string[];
  todos_dias?: boolean;
  dias_disponiveis: string;
  metodos_pagamento: string[];
}

export interface EspacoData {
  locatario_id: number;
  titulo: string;
  descricao?: string;
  fotos_imovel?: string[];
  cidade: string;
  rua: string;
  bairro?: string;
  observacoes?: string;
  valor_imovel: number;
  taxa_limpeza: number;
  disponivel_24h?: boolean;
  hora_inicio?: string;
  hora_fim?: string;
  todos_dias?: boolean;
  dias_disponiveis?:
    | 'segunda'
    | 'terca'
    | 'quarta'
    | 'quinta'
    | 'sexta'
    | 'sabado'
    | 'domingo';
  recursos_imovel?: string[];
  metodos_pagamento?: string[];
}

export interface EspacoResponse extends EspacoData {
  id: number;
  criado_em: Date;
  atualizado_em: Date;
}
export interface EspacoCreate extends Partial<EspacoData> {
  locatario_id: number;
  titulo: string;
  descricao: string;
  fotos_imovel: string[];
}
