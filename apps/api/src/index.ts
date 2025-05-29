import SERVER from '@/config/server.js';
import authRouter from '@/routes/authRouter';
import clienteRouter from '@/routes/clienteRouter';
import espacoRouter from '@/routes/espacoRouter';
import locatarioRouter from '@/routes/locatarioRouter';
import setupSwagger from './config/swagger';

import cors from 'cors';
import express from 'express';

const app = express();
setupSwagger(app);

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended: true, limit: '50mb'}));

const routeEmojis: Record<string, string> = {
  '/auth': '🔑',
  '/locatarios': '👥',
  '/clientes': '🏢',
  '/espacos': '🏠',
};

// Middleware
app.use(cors(SERVER.cors));
app.use(express.json());

// Registro das rotas
app.use('/auth', authRouter);
app.use('/locatarios', locatarioRouter);
app.use('/clientes', clienteRouter);
app.use('/espacos', espacoRouter);

// Iniciando o servidor
app.listen(SERVER.port, () => {
  console.log(`🚀 Servidor iniciado com sucesso!`);
  console.log(`📡 Rodando na porta ${SERVER.port}`);
  console.log(`🔒 CORS configurado`);

  if (process.env.NODE_ENV === 'development') {
    console.log(`💿 Documentação: http://localhost:${SERVER.port}/api/docs`);
  }

  console.log(`📝 Endpoints disponíveis:`);
  Object.keys(routeEmojis).forEach((route) => {
    console.log(`   - ${routeEmojis[route]} ${route}`);
  });
});
