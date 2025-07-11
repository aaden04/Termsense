  const db = require('../config/database_connections');

async function createUser(name, email, password_hash) {
  const queryText = `
    INSERT INTO users (name, email, password_hash)
    VALUES ($1, $2, $3)
    RETURNING id, name, email, created_at;
  `;

  try {
    const result = await db.query(queryText, [name, email, password_hash]);
    return result.rows[0]; 
  } catch (error) {
    throw new Error('Failed to create user: ' + error.message);
  }
}

async function getUserByEmail(email) {
  const queryText = `
    SELECT * FROM users WHERE email = $1;
  `;
  
  try {
    const result = await db.query(queryText, [email]);
    return result.rows[0];
  } catch (error) {
    throw new Error('Failed to get user: ' + error.message);
  }
}

module.exports = {
  createUser,
  getUserByEmail,
};
