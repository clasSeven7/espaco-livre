import cors from '@fastify/cors';
import dotenv from 'dotenv';
import fastify from 'fastify';

dotenv.config();

const app = fastify({
  logger: true,
});

const port = Number(process.env.PORT) || 3000;

// Registrar plugins
app.register(cors, {
  origin: true,
});

// Rota básica
app.get('/', async () => {
  return { message: 'API funcionando!' };
});

// Iniciar servidor
const start = async () => {
  console.log(`Servidor rodando na porta ${port}`);
};

start();
