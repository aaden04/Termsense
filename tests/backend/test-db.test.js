require('dotenv').config({ path: '../../.env', silent: true });

const { Pool } = require('pg');

function validateEnvVars() {
  const requiredVars = ['PG_USER', 'PG_HOST', 'PG_DATABASE', 'PG_PASSWORD', 'PG_PORT'];
  const missing = requiredVars.filter(varName => !process.env[varName]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}

async function testConnection() {
  try {
    validateEnvVars();
    
    const testPool = new Pool({
      user: String(process.env.PG_USER),
      host: String(process.env.PG_HOST), 
      database: String(process.env.PG_DATABASE),
      password: String(process.env.PG_PASSWORD),
      port: parseInt(process.env.PG_PORT, 10),
      connectionTimeoutMillis: 5000,
      idleTimeoutMillis: 30000,
      max: 1
    });

    const res = await testPool.query('SELECT NOW() as current_time');
    const testQuery = await testPool.query('SELECT 1 + 1 as result');
    
    await testPool.end();
    
    console.log('PASSED');
    
  } catch (error) {
    console.log('FAILED:', error.message);
    process.exit(1);
  }
}

testConnection();

