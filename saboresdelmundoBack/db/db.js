const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'reservas_db',
  password: 'adminA123',
  port: 5432
});

module.exports = pool;