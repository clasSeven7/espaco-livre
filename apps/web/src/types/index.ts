export interface FormDataCLiente {
  foto_de_perfil: File | null;
  nome_usuario: string;
  email: string;
  senha: string;
  data_de_nascimento: string;
  cidade: string;
  cep: string;
  endereco_residencial: string;
  telefone: string;
  tipo_ocupacao: string;
  frequencia_uso: string;
}

export interface FormDataLocatario {
  foto_de_perfil: File | null;
  nome_usuario: string;
  email: string;
  senha: string;
  telefone: string;
  data_de_nascimento: string;
  endereco_residencial: string;
  cidade: string;
  cpf: string;
  cep: string;
  aceitar_termos: boolean;
}

export interface FormDataEspaco {
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
  fotos_imovel: File | null;
  todos_dias?: boolean;
  dias_disponiveis: string;
  metodos_pagamento: string[];
}

export interface InfoItemPerfilProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

export interface SpaceCardProps {
  nome: string;
  disponivel: string;
  preco: string;
  localizacao: string;
  imagem: string;
  destaque?: boolean;
  nota: number;
  url?: string;
}

export interface HeaderProps {
  isDarkMode: boolean;
  token: string | null;
  toggleTheme: () => void;
  handleLogout: () => void;
}

export interface CommentProps {
  isDarkMode: boolean;
}

export interface SpaceProps {
  isDarkMode: boolean;
}

export interface FeatureProps {
  isDarkMode: boolean;
}

export interface HeroProps {
  isDarkMode: boolean;
}
export interface HeaderSimpleProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}
