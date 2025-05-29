import { authService } from '@/services/authService';
import { Request, Response } from 'express';

export const authController = {
  async login(request: Request, response: Response) {
    try {
      const { nome_usuario, senha } = request.body;

      if (!nome_usuario || !senha) {
        return response.status(400).json({
          error: '⚠️ Nome de usuário e senha são obrigatórios.',
        });
      }

      const resultado = await authService.login(nome_usuario, senha);

      return response.status(200).json({
        message: resultado.message,
        data: {
          token: resultado.token,
          usuario: resultado.usuario,
        },
      });
    } catch (error: any) {
      console.error('❌ Erro ao realizar login:', error);
      return response.status(error.status || 500).json({
        error:
          error.message ||
          '🔒 Erro interno do servidor ao tentar realizar login',
        details: error.details || 'Por favor, tente novamente mais tarde',
      });
    }
  },
};
