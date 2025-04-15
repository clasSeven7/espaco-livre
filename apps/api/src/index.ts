import SERVER from '@/config/server.js';
import authRouter from '@/routes/authRouter';
import clienteRouter from '@/routes/clienteRouter';
import locatarioRouter from '@/routes/locatarioRouter';

import cors from 'cors';
import express from 'express';

const app = express();

const routeEmojis: Record<string, string> = {
  '/auth': '🔑',
  '/locatarios': '👥',
  '/clientes': '🏢',
};

app.use(cors(SERVER.cors));
app.use(express.json());

// Registro das rotas
app.use('/auth', authRouter);
app.use('/locatarios', locatarioRouter);
app.use('/clientes', clienteRouter);

app.listen(SERVER.port, () => {
  console.log(`🚀 Servidor iniciado com sucesso!`);
  console.log(`📡 Rodando na porta ${SERVER.port}`);
  console.log(`🔒 CORS configurado`);
  console.log(`📝 Endpoints disponíveis:`);
  Object.keys(routeEmojis).forEach((route) => {
    console.log(`   - ${routeEmojis[route]} ${route}`);
  });
});
