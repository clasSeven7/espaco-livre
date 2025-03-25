import { Request, Response } from 'express';
import { authService } from '../services/authService';

export const authController = {
  async login(request: Request, response: Response) {
    try {
      const { nome_usuario, senha } = request.body;
      const resultado = await authService.login(nome_usuario, senha);
      return response.status(200).json(resultado);
    } catch (error: any) {
      console.error('Erro ao realizar login:', error);
      return response.status(error.status || 500).json({
        error: error.message,
      });
    }
  },
};
