import { locatarioController } from '@/controllers/locatarioController';
import { validateLocatario } from '@/middlewares/validateLocatario';
import { Router } from 'express';

const router = Router();

// Rota para criar locatario
router.post('/', validateLocatario, locatarioController.criar);

// Rota para buscar locatario por ID
router.get('/:id', locatarioController.buscarPorId);

// Rota para listar todos os locatarios
router.get('/', locatarioController.listarTodos);

// Rota para atualizar locatario
router.put('/:id', validateLocatario, locatarioController.atualizar);

// Rota para deletar locatario
router.delete('/:id', locatarioController.deletar);

export default router;
