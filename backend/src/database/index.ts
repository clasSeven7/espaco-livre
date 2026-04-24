import DATABASE from '@/config/database';
import pkg from 'pg';

const { Pool } = pkg;

const DB = new Pool({
  host: DATABASE.host,
  user: DATABASE.user,
  password: DATABASE.password,
  database: DATABASE.database,
  port: DATABASE.port,
});

DB.on('connect', () => {
  console.log('📦 Conexão estabelecida com o banco de dados');
});

DB.on('error', (err) => {
  console.error('❌ Erro na conexão com o banco de dados:', err);
});

export default DB;
