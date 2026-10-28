
require('dotenv').config();

const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
  ssl: { rejectUnauthorized: false }
});

async function comprobar() {
  try {
   const resultado = await pool.query(`
     SELECT column_name, column_default, is_nullable
     FROM information_schema.columns
     WHERE table_schema = 'public'
       AND table_name = 'reservas'
     ORDER BY ordinal_position
   `);

    console.table(resultado.rows);
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await pool.end();
  }
}

comprobar();
