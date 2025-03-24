import api from '@/lib/axios';
import { AxiosError } from 'axios';
import Cookies from 'js-cookie';

export interface LoginData {
  nome_usuario: string;
  senha: string;
  salvar_senha?: boolean;
}

export interface AuthResponse {
  token: string;
  user: {
    id: number;
    nome_usuario: string;
    tipo: 'cliente' | 'alocador';
  };
}

const authService = {
  async login(data: LoginData): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>('/auth/login/', {
        nome_usuario: data.nome_usuario,
        senha: data.senha,
      });

      if (response.data.token) {
        // Define o cookie com as informações do usuário
        const cookieOptions = {
          expires: data.salvar_senha ? 30 : 1, // 30 dias se salvar senha, 1 dia se não
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict' as const,
        };

        Cookies.set('user', JSON.stringify(response.data), cookieOptions);
        Cookies.set('token', response.data.token, cookieOptions);
      }
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(
          error.response?.data?.message ||
            'Falha na autenticação. Verifique suas credenciais.'
        );
      }
      throw new Error('Erro ao conectar com o servidor.');
    }
  },

  logout() {
    Cookies.remove('user');
    Cookies.remove('token');
    window.location.href = '/login';
  },

  getCurrentUser() {
    const userStr = Cookies.get('user');
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  },

  isAuthenticated() {
    return !!Cookies.get('token');
  },
};

export default authService;
