const fs = require('fs');
const path = require('path');

test('Signup component file exists', () => {
  const signupPath = path.join(__dirname, '../../Frontend/src/components/Signup.jsx');
  expect(fs.existsSync(signupPath)).toBe(true);
});

test('Signup component has React code', () => {
  const signupPath = path.join(__dirname, '../../Frontend/src/components/Signup.jsx');
  const content = fs.readFileSync(signupPath, 'utf8');
  expect(content).toContain('Signup');
  expect(content).toContain('useState');
});
