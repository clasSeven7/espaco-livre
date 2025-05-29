import {clienteService} from '@/services/clienteService';
import upload from '@/services/uploadService';
import {ClienteData} from '@/types';
import {Request, Response} from 'express';

export const clienteController = {
  async uploadFoto(req: Request, res: Response) {
    try {
      upload.single('foto_de_perfil')(req, res, async (err: any) => {
        if (err) {
          console.error('❌ Erro ao fazer upload:', err);
          return res.status(400).json({
            error: 'Erro ao fazer upload da foto.',
            message: err.message,
          });
        }

        return res.status(200).json({
          message: 'Foto carregada com sucesso!',
          filePath: req.file?.path || null,
        });
      });
    } catch (error: any) {
      console.error('❌ Erro ao carregar foto:', error);
      return res.status(error.status || 500).json({
        error: `❌ ${error.message}`,
      });
    }
  },

  async criar(req: Request, res: Response) {
    try {
      const clienteData = req.body as ClienteData;

      if (req.file) {
        clienteData.foto_de_perfil = req.file.path;
      }

      const resultado = await clienteService.criarCliente(clienteData);

      return res.status(201).json({
        message: '✨ Cliente criado com sucesso!',
        data: resultado,
      });
    } catch (error: any) {
      console.error('❌ Erro ao criar cliente:', error);
      return res.status(error.status || 500).json({
        error: `❌ ${error.message}`,
        field: error.field,
        message: '❌ Não foi possível criar o cliente',
      });
    }
  },

  async buscarPorId(req: Request, res: Response) {
    try {
      const {id} = req.params;
      const cliente = await clienteService.buscarPorId(Number(id));

      if (!cliente) {
        return res.status(404).json({
          error: 'Cliente não encontrado!'
        });
      }

      return res.status(200).json({
        message: '🔍 Cliente encontrado com sucesso!',
        data: cliente,
      });
    } catch (error: any) {
      console.error('❌ Erro ao buscar cliente:', error);
      return res.status(error.status || 500).json({
        error: `🔍 ${error.message}`,
        message: '❌ Não foi possível encontrar o cliente',
      });
    }
  },

  async listarTodos(req: Request, res: Response) {
    try {
      const clientes = await clienteService.listarClientes();
      return res.status(200).json({
        message: '📋 Lista de clientes recuperada com sucesso!',
        data: clientes,
      });
    } catch (error: any) {
      console.error('❌ Erro ao listar clientes:', error);
      return res.status(error.status || 500).json({
        error: `📋 ${error.message}`,
        message: '❌ Não foi possível listar os clientes',
      });
    }
  },

  async atualizar(req: Request, res: Response) {
    try {
      const {id} = req.params;
      const clienteData = req.body as Partial<ClienteData>;

      if (req.file) {
        clienteData.foto_de_perfil = req.file.path;
      }

      const clienteAtualizado = await clienteService.atualizarCliente(
        Number(id),
        clienteData
      );

      return res.status(200).json({
        message: '🔄 Cliente atualizado com sucesso!',
        data: clienteAtualizado
      });
    } catch (error: any) {
      console.error('🔄 Erro ao atualizar cliente:', error);
      return res.status(error.status || 500).json({
        error: `🔄 ${error.message}`,
        message: '❌ Não foi possível atualizar o cliente',
        field: error.field ?? null,
      });
    }
  },

  async deletar(req: Request, res: Response) {
    try {
      const {id} = req.params;
      await clienteService.deletarCliente(Number(id));
      return res.status(204).send();
    } catch (error: any) {
      console.error('🗑️ Erro ao deletar cliente:', error);
      return res.status(error.status || 500).json({
        error: `🗑️ ${error.message}`,
        message: '❌ Não foi possível remover o cliente',
      });
    }
  },
};
