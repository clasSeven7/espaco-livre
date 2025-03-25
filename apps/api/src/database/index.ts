import pkg from 'pg';
import DATABASE from '../config/database';
const { Pool } = pkg;

const DB = new Pool({
  host: DATABASE.host,
  user: DATABASE.user,
  password: DATABASE.password,
  database: DATABASE.database,
  port: DATABASE.port,
});

export default DB;
