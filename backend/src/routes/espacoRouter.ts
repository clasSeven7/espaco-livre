import { espacoController } from '@/controllers/espacoController';
import { validateEspaco } from '@/middlewares/validareEspaco';
import upload from '@/services/uploadService';
import { Router } from 'express';

const router = Router();

// 📌 Criar um novo espaço (com possibilidade de upload de foto)
router.post(
  '/',
  upload.single('fotos_imovel'),
  validateEspaco,
  espacoController.criar
);

// 📌 Upload de foto separado (se presisar disso isoladamente)
router.post(
  '/upload',
  upload.single('fotos_imovel'),
  espacoController.uploadFoto
);

// 📌 Listar todos os espaços
router.get('/', espacoController.listarTodos);

// 📌 Listar espaço por ID
router.get('/:id', espacoController.buscarPorId);

// 📌 Atualizar espaços
router.put(
  '/:id',
  upload.single('fotos_imovel'),
  validateEspaco,
  espacoController.atualizar
);
// 📌 Deletar espaço
router.delete('/:id', espacoController.deletar);

// 📌 Listar espaços por locatário
router.get('/locatario/:locatario_id', espacoController.buscarPorLocatario);

export default router;
