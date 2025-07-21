const bcrypt = require('bcrypt');
const { createUser, getUserByEmail } = require('../services/userService');

async function signup(req, res) {

  try {
    const { name, email, password } = req.body;
    console.log({ name, email, password });

  
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Please fill in all required fields.' });
    }

   
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ error: 'Email already exists' });
    }

  
    const hashedPassword = await bcrypt.hash(password, 10);

   
    const newUser = await createUser(name, email, hashedPassword);

    res.status(201).json({ user: newUser });

  } catch (error) {
    console.error('Signup error:', error);


    if (error.code === '23505') {
      return res.status(409).json({ error: 'Email already exists' });
    }

    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { signup };
