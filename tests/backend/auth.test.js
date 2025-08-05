const axios = require('axios');
const BASE_URL = 'http://localhost:3000';

async function testLogin() {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      email: 'test@example.com',
      password: 'testpassword123'
    });
    return response.status === 200;
  } catch (error) {
    return false;
  }
}

async function testSignup() {
  try {
    const response = await axios.post(`${BASE_URL}/user/signup`, {
      name: 'Test User',
      email: `test${Date.now()}@example.com`,
      password: 'testpassword123'
    });
    return response.status === 201;
  } catch (error) {
    return false;
  }
}

async function runTests() {
  console.log('Running Auth Tests...');
  console.log(`Login Test: ${await testLogin() ? 'PASSED' : 'FAILED'}`);
  console.log(`Signup Test: ${await testSignup() ? 'PASSED' : 'FAILED'}`);
}

if (require.main === module) {
  runTests();
}
