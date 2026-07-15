#!/usr/bin/env node

const { init } = require('../lib/init');

const command = process.argv[2];
const targetPath = process.argv[3] || process.cwd();

if (!command || command === 'init') {
  init(targetPath);
} else if (command === 'version') {
  console.log('stack-card-cli v0.1.0');
} else {
  console.log('Usage: stack-card [init] [path]');
  console.log('  init    Generate a draft Stack Card from a repository');
  console.log('  version Show CLI version');
  process.exit(1);
}
