import SERVER from '@/config/server.js';
import authRouter from '@/routes/authRoutes';
import clienteRouter from '@/routes/clienteRoutes';
import locatarioRouter from '@/routes/locatarioRoutes';
import cors from 'cors';
import express from 'express';

const app = express();

// Mapeamento de emojis para cada rota
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

// Função para obter as rotas registradas
const getRegisteredRoutes = () => {
  return app._router.stack
    .filter((r: any) => r.route)
    .map((r: any) => {
      const path = Object.keys(r.route.methods)[0];
      const route = r.route.path;
      return { path, route };
    });
};

app.listen(SERVER.port, () => {
  console.log(`🚀 Servidor iniciado com sucesso!`);
  console.log(`📡 Rodando na porta ${SERVER.port}`);
  console.log(`🔒 CORS configurado`);
  console.log(`📝 Endpoints disponíveis:`);

  // Lista todas as rotas registradas
  Object.keys(routeEmojis).forEach((route) => {
    console.log(`   - ${routeEmojis[route]} ${route}`);
  });
});
