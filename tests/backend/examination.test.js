const axios = require('axios');
const BASE_URL = 'http://localhost:3000';

async function testExamination() {
  try {
    const response = await axios.post(`${BASE_URL}/user/examination/examine`, {
      documentText: 'This is a test legal document.',
      documentId: 1
    });
    return response.status === 200 && response.data.examination;
  } catch (error) {
    return false;
  }
}

async function runTests() {
  console.log('Running Examination Tests...');
  console.log(`Examination Test: ${await testExamination() ? 'PASSED' : 'FAILED'}`);
}

if (require.main === module) {
  runTests();
}
