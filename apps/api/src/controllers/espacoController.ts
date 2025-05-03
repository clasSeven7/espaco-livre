import { espacoService } from '@/services/espacoService';
import upload from '@/services/uploadService';
import { EspacoData } from '@/types/index';
import { Request, Response } from 'express';

export const espacoController = {
  // Upload da foto do espaço
  async uploadFoto(req: Request, res: Response) {
    try {
      upload.single('fotos_imovel')(req, res, async (err: any) => {
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
  // Criar um novo espaço
  async criar(req: Request, res: Response) {
    try {
      const espacoData = req.body as EspacoData;

      if (req.file) {
        espacoData.fotos_imovel = [req.file.path];
      }

      const resultado = await espacoService.criarEspaco(espacoData);

      return res.status(201).json(resultado);
    } catch (error: any) {
      console.error('❌ Erro ao criar espaço:', error);
      return res.status(error.status || 500).json({
        error: `❌ ${error.message}`,
        field: error.field ?? null,
      });
    }
  },
  // Buscar espaço por ID
  async buscarPorId(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const espaco = await espacoService.buscarPorId(Number(id));
      if (!espaco) {
        return res.status(404).json({ error: 'Espaço não encontrado.' });
      }
      return res.status(200).json(espaco);
    } catch (error: any) {
      console.error('❌ Erro ao buscar espaço por ID:', error);
      return res.status(error.status || 500).json({
        error: `❌ ${error.message}`,
        field: error.field ?? null,
      });
    }
  },
  // Buscar espaços por locatário
  async buscarPorLocatario(req: Request, res: Response) {
    try {
      const { locatario_id } = req.params;
      const espacos = await espacoService.buscarPorLocatario(
        Number(locatario_id)
      );
      if (!espacos.length) {
        return res.status(404).json({ error: 'Nenhum espaço encontrado.' });
      }
      return res.status(200).json(espacos);
    } catch (error: any) {
      console.error('❌ Erro ao buscar espaços do locatário:', error);
      return res.status(error.status || 500).json({
        error: `❌ ${error.message}`,
        field: error.field ?? null,
      });
    }
  },
  // Listar todos os espaços
  async listarTodos(req: Request, res: Response) {
    try {
      const espacos = await espacoService.listarEspacos();
      return res.status(200).json(espacos);
    } catch (error: any) {
      console.error('📋 Erro ao listar espaços:', error);
      return res.status(error.status || 500).json({
        error: `📋 ${error.message}`,
      });
    }
  },
  // Atualizar espaço
  async atualizar(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const espacoData = req.body as Partial<EspacoData>;

      if (req.file) {
        espacoData.fotos_imovel = [req.file.path];
      }

      const resultado = await espacoService.atualizarEspaco(
        Number(id),
        espacoData
      );

      return res.status(200).json(resultado);
    } catch (error: any) {
      console.error('❌ Erro ao atualizar espaço:', error);
      return res.status(error.status || 500).json({
        error: `❌ ${error.message}`,
        field: error.field ?? null,
      });
    }
  },
  // Deletar espaço
  async deletar(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const resultado = await espacoService.deletarEspaco(Number(id));

      if (!resultado) {
        return res.status(404).json({ error: 'Espaço não encontrado.' });
      }

      return res.status(200).json({ message: 'Espaço deletado com sucesso!' });
    } catch (error: any) {
      console.error('❌ Erro ao deletar espaço:', error);
      return res.status(error.status || 500).json({
        error: `❌ ${error.message}`,
        field: error.field ?? null,
      });
    }
  },
};
