require('dotenv').config({ path: '../../.env' });

const { Pool } = require('pg');

const requiredEnvVars = ['PG_USER', 'PG_HOST', 'PG_DATABASE', 'PG_PASSWORD', 'PG_PORT'];
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  throw new Error(`Missing required database environment variables: ${missingVars.join(', ')}`);
}

const pool = new Pool({
  user: String(process.env.PG_USER),
  host: String(process.env.PG_HOST),
  database: String(process.env.PG_DATABASE),
  password: String(process.env.PG_PASSWORD),
  port: parseInt(process.env.PG_PORT, 10),
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool: pool
};
