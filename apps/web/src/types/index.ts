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

export interface CommentProps {
  isDarkMode: boolean;
}

export interface SpaceProps {
  isDarkMode: boolean;
}

export interface FeatureProps {
  isDarkMode: boolean;
}
