import { Request, Response } from 'express';
import { alocadorService } from '../services/alocadorService';
import { AlocadorData } from '../types';

export const alocadorController = {
  async criar(request: Request, response: Response) {
    try {
      const alocadorData = request.body as AlocadorData;
      const resultado = await alocadorService.criarAlocador(alocadorData);
      return response.status(201).json(resultado);
    } catch (error: any) {
      console.error('Erro ao criar alocador:', error);
      return response.status(error.status || 500).json({
        error: error.message,
        field: error.field,
      });
    }
  },

  async buscarPorId(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const alocador = await alocadorService.buscarPorId(Number(id));
      return response.status(200).json(alocador);
    } catch (error: any) {
      console.error('Erro ao buscar alocador:', error);
      return response.status(error.status || 500).json({
        error: error.message,
      });
    }
  },

  async listarTodos(request: Request, response: Response) {
    try {
      const alocadores = await alocadorService.listarTodos();
      return response.status(200).json(alocadores);
    } catch (error: any) {
      console.error('Erro ao listar alocadores:', error);
      return response.status(error.status || 500).json({
        error: error.message,
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
      return response.status(200).json(alocador);
    } catch (error: any) {
      console.error('Erro ao atualizar alocador:', error);
      return response.status(error.status || 500).json({
        error: error.message,
      });
    }
  },

  async deletar(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const resultado = await alocadorService.deletar(Number(id));
      return response.status(200).json(resultado);
    } catch (error: any) {
      console.error('Erro ao deletar alocador:', error);
      return response.status(error.status || 500).json({
        error: error.message,
      });
    }
  },
};
