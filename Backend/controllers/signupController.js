const bcrypt = require('bcrypt');          
const db = require('../config/database_connections');               


async function signup(req, res) {
  try {
    const { name, email, password } = req.body;

 
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Please fill in all required fields. 00' });
    }

  
    const hashedPassword = await bcrypt.hash(password, 10);  

    const createUser = `
      INSERT INTO users (name, email, password_hash) 
      VALUES ($1, $2, $3) 
      RETURNING id, name, email, created_at;
    `;

  
    const result = await db.query(createUserQuery, [name, email, hashedPassword]);

    
    res.status(201).json({ user: result.rows[0] });

  } catch (error) {
    console.error('Signup error:', error);

    
    if (error.code === '23505') {  
      return res.status(409).json({ error: 'Email already exists 00' });
    }

    res.status(500).json({ error: 'Internal server error 00' });
  }
}

module.exports = { signup };
