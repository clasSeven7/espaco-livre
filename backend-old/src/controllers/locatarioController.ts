import { locatarioService } from '@/services/locatarioService';
import { LocatarioData } from '@/types/index';
import { Request, Response } from 'express';

export const locatarioController = {
  async criar(request: Request, response: Response) {
    try {
      const locatarioData = request.body as LocatarioData;
      const resultado = await locatarioService.criarLocatario(locatarioData);
      return response.status(201).json({
        message: '✨ Locatario criado com sucesso!',
        data: resultado,
      });
    } catch (error: any) {
      console.error('❌ Erro ao criar locatario:', error);
      return response.status(error.status || 500).json({
        error: error.message,
        field: error.field,
        message: '❌ Não foi possível criar o locatario',
      });
    }
  },

  async buscarPorId(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const locatario = await locatarioService.buscarPorId(Number(id));
      return response.status(200).json({
        message: '🔍 Locatatio encontrado com sucesso!',
        data: locatario,
      });
    } catch (error: any) {
      console.error('❌ Erro ao buscar locatario:', error);
      return response.status(error.status || 500).json({
        error: error.message,
        message: '❌ Não foi possível encontrar o locatario',
      });
    }
  },

  async listarTodos(request: Request, response: Response) {
    try {
      const locatarios = await locatarioService.listarTodos();
      return response.status(200).json({
        message: '📋 Lista de locatarios recuperada com sucesso!',
        data: locatarios,
      });
    } catch (error: any) {
      console.error('❌ Erro ao listar locatarios:', error);
      return response.status(error.status || 500).json({
        error: error.message,
        message: '❌ Não foi possível listar os locatarios',
      });
    }
  },

  async atualizar(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const locatarioData = request.body as Partial<LocatarioData>;
      const locatario = await locatarioService.atualizar(
        Number(id),
        locatarioData
      );
      return response.status(200).json({
        message: '🔄 Locatario atualizado com sucesso!',
        data: locatario,
      });
    } catch (error: any) {
      console.error('❌ Erro ao atualizar locatario:', error);
      return response.status(error.status || 500).json({
        error: error.message,
        message: '❌ Não foi possível atualizar o locatario',
      });
    }
  },

  async deletar(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const resultado = await locatarioService.deletar(Number(id));
      return response.status(200).json({
        message: '🗑️ Locatario removido com sucesso!',
        data: resultado,
      });
    } catch (error: any) {
      console.error('❌ Erro ao deletar locatario:', error);
      return response.status(error.status || 500).json({
        error: error.message,
        message: '❌ Não foi possível remover o locatario',
      });
    }
  },
};
