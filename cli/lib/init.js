const fs = require('fs');
const path = require('path');
const { parsePackageJson } = require('./parsers/package-json');
const { parseRequirementsTxt } = require('./parsers/requirements-txt');
const { generateStackCard } = require('./generator');

function init(targetPath) {
  const resolvedPath = path.resolve(targetPath);
  
  if (!fs.existsSync(resolvedPath)) {
    console.error(`Error: Path does not exist: ${resolvedPath}`);
    process.exit(1);
  }

  console.log(`🔍 Scanning ${resolvedPath}...\n`);

  let parsed = null;
  let manifestFile = null;

  const packageJsonPath = path.join(resolvedPath, 'package.json');
  if (fs.existsSync(packageJsonPath)) {
    parsed = parsePackageJson(packageJsonPath);
    manifestFile = 'package.json';
  }

  if (!parsed) {
    const requirementsPath = path.join(resolvedPath, 'requirements.txt');
    if (fs.existsSync(requirementsPath)) {
      parsed = parseRequirementsTxt(requirementsPath);
      manifestFile = 'requirements.txt';
    }
  }

  if (!parsed) {
    console.error('No supported manifest found (package.json, requirements.txt)');
    console.log('Supported: Node.js (package.json), Python (requirements.txt)');
    process.exit(1);
  }

  const stackCard = generateStackCard(parsed, manifestFile);
  
  const outputPath = path.join(resolvedPath, 'stack-card.json');
  fs.writeFileSync(outputPath, JSON.stringify(stackCard, null, 2));
  
  console.log(`✅ Stack Card generated: ${outputPath}`);
  console.log(`\n📊 Detected:`);
  console.log(`   Project: ${stackCard.project.name}`);
  console.log(`   Version: ${stackCard.project.version}`);
  console.log(`   Stack layers: ${stackCard.stack.length}`);
  console.log(`   Direct deps: ${stackCard.dependencies?.direct_count || 0}`);
  console.log(`   Transitive deps: ${stackCard.dependencies?.transitive_count || 0}`);
  console.log(`\n⚠️  Note: intended_use, security, and ethical_considerations are empty.`);
  console.log('   Please edit stack-card.json to fill these in.');
}

module.exports = { init };
