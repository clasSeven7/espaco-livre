import { Request, Response } from 'express';
import { clienteService } from '../services/clienteService';
import { ClienteData } from '../types';

export const clienteController = {
  async criar(request: Request, response: Response) {
    try {
      const clienteData = request.body as ClienteData;
      const resultado = await clienteService.criarCliente(clienteData);
      return response.status(201).json(resultado);
    } catch (error: any) {
      console.error('Erro ao criar cliente:', error);
      return response.status(error.status || 500).json({
        error: error.message,
        field: error.field,
      });
    }
  },

  async buscarPorId(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const cliente = await clienteService.buscarPorId(Number(id));
      return response.status(200).json(cliente);
    } catch (error: any) {
      console.error('Erro ao buscar cliente:', error);
      return response.status(error.status || 500).json({
        error: error.message,
      });
    }
  },

  async listarTodos(request: Request, response: Response) {
    try {
      const clientes = await clienteService.listarClientes();
      return response.status(200).json(clientes);
    } catch (error: any) {
      console.error('Erro ao listar clientes:', error);
      return response.status(error.status || 500).json({
        error: error.message,
      });
    }
  },

  async atualizar(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const clienteData = request.body as Partial<ClienteData>;
      const cliente = await clienteService.atualizarCliente(
        Number(id),
        clienteData
      );
      return response.status(200).json(cliente);
    } catch (error: any) {
      console.error('Erro ao atualizar cliente:', error);
      return response.status(error.status || 500).json({
        error: error.message,
        field: error.field,
      });
    }
  },

  async deletar(request: Request, response: Response) {
    try {
      const { id } = request.params;
      await clienteService.deletarCliente(Number(id));
      return response.status(204).send();
    } catch (error: any) {
      console.error('Erro ao deletar cliente:', error);
      return response.status(error.status || 500).json({
        error: error.message,
      });
    }
  },
};
