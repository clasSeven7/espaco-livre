import { authService } from '@/services/authService';
import { Request, Response } from 'express';

export const authController = {
  async login(request: Request, response: Response) {
    try {
      const { nome_usuario, senha } = request.body;
      const resultado = await authService.login(nome_usuario, senha);
      return response.status(200).json({
        message: '🎉 Login realizado com sucesso!',
        data: resultado,
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
