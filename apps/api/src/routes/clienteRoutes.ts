import { Router } from 'express';
import { clienteController } from '../controllers/clienteController';
import { validateCliente } from '../middlewares/validateCliente';

const router = Router();

// Rota para criar cliente
router.post('/', validateCliente, clienteController.criar);

// Rota para buscar cliente por ID
router.get('/:id', clienteController.buscarPorId);

// Rota para listar todos os clientes
router.get('/', clienteController.listarTodos);

// Rota para atualizar cliente
router.put('/:id', validateCliente, clienteController.atualizar);

// Rota para deletar cliente
router.delete('/:id', clienteController.deletar);

export default router;
