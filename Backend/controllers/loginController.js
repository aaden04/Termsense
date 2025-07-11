const bcrypt = require('bcrypt');
const { getUserByEmail } = require('../services/userService');

async function login(req, res) {
  console.log('Login route hit');
  
  try {
    const { email, password } = req.body;
    console.log('Login attempt for email:', email);


    if (!email || !password) {
      return res.status(400).json({ error: 'Please provide email and password.' });
    }


    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }


    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }


    const { password_hash, ...userWithoutPassword } = user;
    
    res.status(200).json({ 
      message: 'Login successful',
      user: userWithoutPassword 
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { login };