const fs = require('fs');
const path = require('path');

const basePath = __dirname;
const dirs = [
  'public',
  'src',
  'src/api',
  'src/components',
  'src/pages',
  'src/assets'
];

console.log('Creating directories in:', basePath);

dirs.forEach(dir => {
  const fullPath = path.join(basePath, dir);
  try {
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
      console.log('✓ Created:', dir);
    } else {
      console.log('✓ Already exists:', dir);
    }
  } catch (err) {
    console.error('✗ Error creating', dir, ':', err.message);
  }
});

console.log('\nDirectory structure created successfully!');
