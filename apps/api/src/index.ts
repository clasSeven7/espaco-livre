import cors from 'cors';
import express from 'express';
import SERVER from './config/server.js';
import alocadorRouter from './routes/alocadorRoutes.js';
import clienteRouter from './routes/clienteRoutes.js';

const app = express();

app.use(cors(SERVER.cors));
app.use(express.json());
app.use('/clientes', clienteRouter);
app.use('/alocadores', alocadorRouter);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
