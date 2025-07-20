require('dotenv').config({ path: '../.env' });

const db = require('../../Backend/config/database_connections');

async function testConnection() {
  try {
    const res = await db.query('SELECT NOW()');
    console.log('Database connection successful:', res.rows[0]);
  } catch (error) {
    console.error('Connection failed:', error);
  }
}

testConnection();

