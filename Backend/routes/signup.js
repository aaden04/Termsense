const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../config/database_connections');  

router.post('/signup', async (req, res) => {
      console.log('Signup route hit');
  try {
    const { name, email, password } = req.body;
       console.log({ name, email, password });


    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Please fill in all required fields.' });
    }

  
    const hashedPassword = await bcrypt.hash(password, 10);


    const create_User = `
      INSERT INTO users (name, email, password_hash)
      VALUES ($1, $2, $3)
      RETURNING id, name, email, created_at
    `;
    const values = [name, email, hashedPassword];

    const result = await db.query(create_User, values);

    res.status(201).json({ user: result.rows[0] });

  } catch (error) {
    if (error.code === '23505') {  
      return res.status(400).json({ error: 'Email already exists' });
    }
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
