const userService = require('../../Backend/services/userService');
const documentService = require('../../Backend/services/documentService');

async function testUserService() {
  try {
    const testEmail = `test${Date.now()}@example.com`;
    const user = await userService.createUser('Test User', testEmail, 'hashedpass');
    return user && user.id;
  } catch (error) {
    return false;
  }
}

async function testDocumentService() {
  try {
    const documents = await documentService.getDocumentsByUser(1);
    return Array.isArray(documents);
  } catch (error) {
    return false;
  }
}

async function runTests() {
  console.log('Running Service Tests...');
  console.log(`User Service Test: ${await testUserService() ? 'PASSED' : 'FAILED'}`);
  console.log(`Document Service Test: ${await testDocumentService() ? 'PASSED' : 'FAILED'}`);
}

if (require.main === module) {
  runTests();
}
