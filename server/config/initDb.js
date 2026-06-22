const db = require('./db');

let initPromise;

function initDb() {
  if (!initPromise) {
    initPromise = createTables().catch(error => {
      initPromise = null;
      console.error('INIT DB ERROR:', error.message);
      throw error;
    });
  }

  return initPromise;
}

async function createTables() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS leads (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      comment TEXT DEFAULT '',
      status TEXT NOT NULL DEFAULT 'new',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  await db.query(`
    CREATE TABLE IF NOT EXISTS vehicles (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      price NUMERIC DEFAULT 0,
      category TEXT NOT NULL,
      description TEXT DEFAULT '',
      image TEXT DEFAULT '',
      images TEXT DEFAULT '',
      page_url TEXT DEFAULT '',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
}

module.exports = initDb;
