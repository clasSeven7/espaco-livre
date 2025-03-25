import cors from 'cors';
import express from 'express';
import SERVER from './config/server.js';
import alocadorRouter from './routes/alocadorRoutes.js';
import authRouter from './routes/authRoutes.js';
import clienteRouter from './routes/clienteRoutes.js';

const app = express();

app.use(cors(SERVER.cors));
app.use(express.json());

app.use('/auth', authRouter);
app.use('/alocadores', alocadorRouter);
app.use('/clientes', clienteRouter);

app.listen(SERVER.port, () => {
  console.log(`Servidor rodando na porta ${SERVER.port}`);
});
