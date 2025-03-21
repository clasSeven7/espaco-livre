import api from '@/lib/axios';
import { AxiosError } from 'axios';

export interface CadastroClienteData {
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

export interface CadastroAlocadorData {
  email: string;
  senha: string;
  nome_usuario: string;
  telefone: string;
  idade: number;
  endereco_residencial: string;
  cidade: string;
  cpf: string;
  cep: string;
  aceitar_termos: boolean;
}

const cadastroService = {
  async cadastrarCliente(data: CadastroClienteData) {
    try {
      const response = await api.post('/auth/cadastro/cliente/', data);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(
          error.response?.data?.message ||
            'Erro ao realizar cadastro. Tente novamente.'
        );
      }
      throw new Error('Erro ao conectar com o servidor.');
    }
  },

  async cadastrarAlocador(data: CadastroAlocadorData) {
    try {
      const response = await api.post('/auth/cadastro/alocador/', data);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(
          error.response?.data?.message ||
            'Erro ao realizar cadastro. Tente novamente.'
        );
      }
      throw new Error('Erro ao conectar com o servidor.');
    }
  },
};

export default cadastroService;
