const fs = require('fs');

function parseRequirementsTxt(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n').filter(line => line.trim() && !line.startsWith('#'));
  
  const dependencies = {};
  const stack = [];
  
  lines.forEach(line => {
    const match = line.match(/^([a-zA-Z0-9_-]+)([=<>!~]+)?(.+)?$/);
    if (match) {
      const name = match[1];
      const version = match[3] || 'unknown';
      dependencies[name] = version;
      
      if (name === 'django') {
        stack.push({ layer: 'backend', technology: 'Django', version, source_file: 'requirements.txt' });
      } else if (name === 'flask') {
        stack.push({ layer: 'backend', technology: 'Flask', version, source_file: 'requirements.txt' });
      } else if (name === 'fastapi') {
        stack.push({ layer: 'backend', technology: 'FastAPI', version, source_file: 'requirements.txt' });
      }
    }
  });

  return {
    name: 'python-project',
    version: '0.1.0',
    description: '',
    author: '',
    license: 'UNLICENSED',
    dependencies,
    directCount: lines.length,
    transitiveCount: 0,
    stack
  };
}

module.exports = { parseRequirementsTxt };
