const DATABASE = {
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'espaco_livre_db',
  password: process.env.DB_PASSWORD || 'postgres-admin',
  port: Number(process.env.DB_PORT) || 5432,
};

export default DATABASE;
