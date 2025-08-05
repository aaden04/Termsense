const fs = require('fs');
const path = require('path');

test('Login component file exists', () => {
  const loginPath = path.join(__dirname, '../../Frontend/src/components/Login.jsx');
  expect(fs.existsSync(loginPath)).toBe(true);
});

test('Login component has React code', () => {
  const loginPath = path.join(__dirname, '../../Frontend/src/components/Login.jsx');
  const content = fs.readFileSync(loginPath, 'utf8');
  expect(content).toContain('Login');
  expect(content).toContain('useState');
});
