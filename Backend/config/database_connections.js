require('dotenv').config({ path: '../.env' });
console.log('Password from env:', JSON.stringify(process.env.PG_PASSWORD));
console.log('Gemini API Key:', process.env.GEMINI_API_KEY);


const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});


module.exports = {
  query: (text, params) => pool.query(text, params),
};
