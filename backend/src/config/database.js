// Backend Database Configuration
// To be implemented with PostgreSQL connection

import pkg from 'pg';
const { Pool } = pkg;

// Railway provides DATABASE_URL, fallback to individual params for local dev
const pool = process.env.DATABASE_URL
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
    })
  : new Pool({
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 5432,
      database: process.env.DB_NAME || 'ecom_db'
    });

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
});

export default pool;
