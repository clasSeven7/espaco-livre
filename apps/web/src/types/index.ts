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
