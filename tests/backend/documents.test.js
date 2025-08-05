const axios = require('axios');
const FormData = require('form-data');
const BASE_URL = 'http://localhost:3000';

async function testDocumentUpload() {
  try {
    const formData = new FormData();
    formData.append('user_id', '1');
    formData.append('title', 'Test Document');
    formData.append('text', 'This is a test document.');

    const response = await axios.post(`${BASE_URL}/user/documents/upload`, formData, {
      headers: formData.getHeaders()
    });
    return response.status === 201;
  } catch (error) {
    return false;
  }
}

async function testDocumentFetch() {
  try {
    const response = await axios.get(`${BASE_URL}/user/documents/user/1`);
    return response.status === 200 && Array.isArray(response.data);
  } catch (error) {
    return false;
  }
}

async function runTests() {
  console.log('Running Document Tests...');
  console.log(`Upload Test: ${await testDocumentUpload() ? 'PASSED' : 'FAILED'}`);
  console.log(`Fetch Test: ${await testDocumentFetch() ? 'PASSED' : 'FAILED'}`);
}

if (require.main === module) {
  runTests();
}
