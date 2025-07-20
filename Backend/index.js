const express = require('express');
const signupRoutes = require('./routes/signup');
const loginRoutes = require('./routes/login');
const cors = require('cors');
const documentRoutes = require('./routes/documents');

const app = express();
const port = 3000;


app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello from Express!');
});


app.get('/signup', (req, res) => {
  res.send('Signup page - use POST to create account');
});

app.get('/login', (req, res) => {
  res.send('Login page - use POST to login');
});



app.use('/user', signupRoutes);
app.use('/auth', loginRoutes);
app.use('/user/documents', documentRoutes);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
