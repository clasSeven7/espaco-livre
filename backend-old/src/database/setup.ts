import DATABASE from '@/config/database';
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import pkg from 'pg';
import { fileURLToPath } from 'url';
const { Pool } = pkg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function setupDatabase() {
  const initialPool = new Pool({
    user: DATABASE.user,
    password: DATABASE.password,
    host: DATABASE.host,
    port: DATABASE.port,
    database: 'postgres',
  });

  try {
    const dbExistsResult = await initialPool.query(
      `SELECT 1 FROM pg_database WHERE datname = '${DATABASE.database}'`
    );

    if (dbExistsResult.rows.length === 0) {
      await initialPool.query(`CREATE DATABASE ${DATABASE.database}`);
      console.log('✅ Banco de dados criado com sucesso!');
    }
  } catch (error) {
    console.error('❌ Erro ao criar banco de dados:', error);
    throw error;
  } finally {
    await initialPool.end();
  }

  const dpePool = new Pool({
    user: DATABASE.user,
    password: DATABASE.password,
    host: DATABASE.host,
    port: DATABASE.port,
    database: 'espaco_livre_db',
  });

  try {
    const sqlFile = readFileSync(join(__dirname, 'schema.sql'), 'utf8');
    const sqlCommands = sqlFile
      .split(';')
      .filter((cmd) => !cmd.includes('CREATE DATABASE') && !cmd.includes('\\c'))
      .join(';');

    await dpePool.query(sqlCommands);
    console.log('✅ Tabelas criadas com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao criar tabelas:', error);
    throw error;
  } finally {
    await dpePool.end();
  }
}

setupDatabase();
