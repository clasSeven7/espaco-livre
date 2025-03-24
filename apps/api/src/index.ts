import cors from '@fastify/cors';
import fastify from 'fastify';
import server from './config/server';
import { clienteRoutes } from './routes/clienteRoutes';

const app = fastify({
  logger: true,
});

const port = server.port;

// Registrar plugins
app.register(cors, {
  origin: true,
});

// Registrar rotas
app.register(clienteRoutes);

// Rota básica
app.get('/', async () => {
  return { message: 'API funcionando!' };
});

// Iniciar servidor
const start = async () => {
  console.log(`Servidor rodando na porta ${port}`);
};

start();
