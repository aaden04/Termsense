
const db = require('../config/database_connections');

async function createUser(name, email, password_hash) {
  const queryText = `
    INSERT INTO users (name, email, password_hash)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;

  try {
    const result = await db.query(queryText, [name, email, password_hash]);
    return result.rows[0]; 
  } catch (error) {
    throw new Error('Failed to create user: ' + error.message);
  }
}

module.exports = {
  createUser,
};
