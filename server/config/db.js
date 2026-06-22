const { Pool } = require('pg');

let pool;

function getPool() {
  if (!process.env.DATABASE_URL) {
    const error = new Error('DATABASE_URL is not configured');
    error.code = 'DATABASE_URL_MISSING';
    throw error;
  }

  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.PGSSLMODE === 'disable'
        ? false
        : { rejectUnauthorized: false }
    });
  }

  return pool;
}

async function query(text, params) {
  return getPool().query(text, params);
}

module.exports = {
  query,
  getPool
};
