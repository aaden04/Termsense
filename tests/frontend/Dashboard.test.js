const fs = require('fs');
const path = require('path');

test('Dashboard component file exists', () => {
  const dashboardPath = path.join(__dirname, '../../Frontend/src/components/Dashboard.jsx');
  expect(fs.existsSync(dashboardPath)).toBe(true);
});

test('Dashboard component has React code', () => {
  const dashboardPath = path.join(__dirname, '../../Frontend/src/components/Dashboard.jsx');
  const content = fs.readFileSync(dashboardPath, 'utf8');
  expect(content).toContain('Dashboard');
  expect(content).toContain('useState');
});
