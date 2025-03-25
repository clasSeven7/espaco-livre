import { Router } from 'express';
import { alocadorController } from '../controllers/alocadorController';
import { validateAlocador } from '../middlewares/validateAlocador';

const router = Router();

// Rota para criar alocador
router.post('/', validateAlocador, alocadorController.criar);

// Rota para buscar alocador por ID
router.get('/:id', alocadorController.buscarPorId);

// Rota para listar todos os alocadores
router.get('/', alocadorController.listarTodos);

// Rota para atualizar alocador
router.put('/:id', validateAlocador, alocadorController.atualizar);

// Rota para deletar alocador
router.delete('/:id', alocadorController.deletar);

export default router;
