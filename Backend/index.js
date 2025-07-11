const express = require('express');
const signupRoutes = require('./routes/signup');

const app = express();
const port = 3000;


app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from Express!');
});


app.get('/signup', (req, res) => {
  res.send('Signup page - use POST to create account');
});


app.use('/user', signupRoutes);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
