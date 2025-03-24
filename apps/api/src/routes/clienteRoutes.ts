import { FastifyInstance } from 'fastify';
import { clienteController } from '../controllers/clienteController';

export async function clienteRoutes(app: FastifyInstance) {
  app.post('/clientes', clienteController.criar);
}
