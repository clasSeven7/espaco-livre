import { Request, Response } from 'express';
import { alocadorService } from '../services/alocadorService';
import { AlocadorData } from '../types';

export const alocadorController = {
  async criar(request: Request, response: Response) {
    try {
      const alocadorData = request.body as AlocadorData;
      const resultado = await alocadorService.criarAlocador(alocadorData);
      return response.status(201).json({
        message: '✨ Alocador criado com sucesso!',
        data: resultado,
      });
    } catch (error: any) {
      console.error('❌ Erro ao criar alocador:', error);
      return response.status(error.status || 500).json({
        error: error.message,
        field: error.field,
        message: '❌ Não foi possível criar o alocador',
      });
    }
  },

  async buscarPorId(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const alocador = await alocadorService.buscarPorId(Number(id));
      return response.status(200).json({
        message: '🔍 Alocador encontrado com sucesso!',
        data: alocador,
      });
    } catch (error: any) {
      console.error('❌ Erro ao buscar alocador:', error);
      return response.status(error.status || 500).json({
        error: error.message,
        message: '❌ Não foi possível encontrar o alocador',
      });
    }
  },

  async listarTodos(request: Request, response: Response) {
    try {
      const alocadores = await alocadorService.listarTodos();
      return response.status(200).json({
        message: '📋 Lista de alocadores recuperada com sucesso!',
        data: alocadores,
      });
    } catch (error: any) {
      console.error('❌ Erro ao listar alocadores:', error);
      return response.status(error.status || 500).json({
        error: error.message,
        message: '❌ Não foi possível listar os alocadores',
      });
    }
  },

  async atualizar(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const alocadorData = request.body as Partial<AlocadorData>;
      const alocador = await alocadorService.atualizar(
        Number(id),
        alocadorData
      );
      return response.status(200).json({
        message: '🔄 Alocador atualizado com sucesso!',
        data: alocador,
      });
    } catch (error: any) {
      console.error('❌ Erro ao atualizar alocador:', error);
      return response.status(error.status || 500).json({
        error: error.message,
        message: '❌ Não foi possível atualizar o alocador',
      });
    }
  },

  async deletar(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const resultado = await alocadorService.deletar(Number(id));
      return response.status(200).json({
        message: '🗑️ Alocador removido com sucesso!',
        data: resultado,
      });
    } catch (error: any) {
      console.error('❌ Erro ao deletar alocador:', error);
      return response.status(error.status || 500).json({
        error: error.message,
        message: '❌ Não foi possível remover o alocador',
      });
    }
  },
};
