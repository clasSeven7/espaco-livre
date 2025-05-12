import {locatarioService} from '@/services/locatarioService';
import upload from '@/services/uploadService';
import {LocatarioData} from '@/types';
import {Request, Response} from 'express';

export const locatarioController = {
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
      const locatarioData = req.body as LocatarioData;

      if (req.file) {
        locatarioData.foto_de_perfil = req.file.path;
      }

      const resultado = await locatarioService.criarLocatario(locatarioData);

      return res.status(201).json({
        message: '✨ Locatario criado com sucesso!',
        data: resultado,
      });
    } catch (error: any) {
      console.error('❌ Erro ao criar locatario:', error);
      return res.status(error.status || 500).json({
        error: `❌ ${error.message}`,
        field: error.field,
        message: '❌ Não foi possível criar o locatario',
      });
    }
  },

  async buscarPorId(req: Request, res: Response) {
    try {
      const {id} = req.params;
      const locatario = await locatarioService.buscarPorId(Number(id));

      if (!locatario) {
        return res.status(404).json({
          error: 'Locatário não encontrado!'
        })
      }

      return res.status(200).json({
        message: '🔍 Locatatio encontrado com sucesso!',
        data: locatario,
      });
    } catch (error: any) {
      console.error('❌ Erro ao buscar locatario:', error);
      return res.status(error.status || 500).json({
        error: `🔍 ${error.message}`,
        message: '❌ Não foi possível encontrar o locatario',
      });
    }
  },

  async listarTodos(req: Request, res: Response) {
    try {
      const locatarios = await locatarioService.listarLocatarios();
      return res.status(200).json({
        message: '📋 Lista de locatarios recuperada com sucesso!',
        data: locatarios,
      });
    } catch (error: any) {
      console.error('❌ Erro ao listar locatarios:', error);
      return res.status(error.status || 500).json({
        error: `📋 ${error.message}`,
        message: '❌ Não foi possível listar os locatarios',
      });
    }
  },

  async atualizar(req: Request, res: Response) {
    try {
      const {id} = req.params;
      const locatarioData = req.body as Partial<LocatarioData>;

      if (req.file) {
        locatarioData.foto_de_perfil = req.file.path;
      }

      const locatarioAtualizado = await locatarioService.atualizarLocatario(
        Number(id),
        locatarioData
      );

      return res.status(200).json({
        message: '🔄 Locatario atualizado com sucesso!',
        data: locatarioAtualizado,
      });
    } catch (error: any) {
      console.error('❌ Erro ao atualizar locatario:', error);
      return res.status(error.status || 500).json({
        error: `🔄 ${error.message}`,
        message: '❌ Não foi possível atualizar o locatario',
        field: error.field ?? null,
      });
    }
  },

  async deletar(req: Request, res: Response) {
    try {
      const {id} = req.params;
      await locatarioService.deletarLocatario(Number(id));
      return res.status(204).send();
    } catch (error: any) {
      console.error('🗑️ Erro ao deletar locatario:', error);
      return res.status(error.status || 500).json({
        error: `🗑️ ${error.message}`,
        message: '❌ Não foi possível remover o locatario',
      });
    }
  },
};
