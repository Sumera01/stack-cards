const fs = require('fs');

function parsePackageJson(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const pkg = JSON.parse(content);

  const dependencies = pkg.dependencies || {};
  const devDependencies = pkg.devDependencies || {};
  const allDeps = { ...dependencies, ...devDependencies };

  const stack = [];
  
  if (allDeps['next'] || allDeps['nextjs']) {
    stack.push({ layer: 'frontend', technology: 'Next.js', version: allDeps['next'] || 'unknown', source_file: 'package.json' });
    stack.push({ layer: 'backend', technology: 'Next.js API Routes', version: allDeps['next'] || 'unknown', source_file: 'package.json' });
  } else if (allDeps['react']) {
    stack.push({ layer: 'frontend', technology: 'React', version: allDeps['react'], source_file: 'package.json' });
  }
  
  if (allDeps['vue']) {
    stack.push({ layer: 'frontend', technology: 'Vue.js', version: allDeps['vue'], source_file: 'package.json' });
  }
  
  if (allDeps['tailwindcss'] || allDeps['tailwind-css']) {
    stack.push({ layer: 'styling', technology: 'Tailwind CSS', version: allDeps['tailwindcss'] || allDeps['tailwind-css'], source_file: 'package.json' });
  }
  
  if (allDeps['express']) {
    stack.push({ layer: 'backend', technology: 'Express.js', version: allDeps['express'], source_file: 'package.json' });
  }
  
  if (allDeps['prisma'] || allDeps['@prisma/client']) {
    stack.push({ layer: 'database', technology: 'Prisma', version: allDeps['prisma'] || allDeps['@prisma/client'], source_file: 'package.json' });
  }
  
  if (allDeps['@clerk/nextjs'] || allDeps['@clerk/clerk-react']) {
    stack.push({ layer: 'auth', technology: 'Clerk', version: allDeps['@clerk/nextjs'] || allDeps['@clerk/clerk-react'], source_file: 'package.json' });
  } else if (allDeps['next-auth'] || allDeps['nextauth']) {
    stack.push({ layer: 'auth', technology: 'NextAuth.js', version: allDeps['next-auth'] || allDeps['nextauth'], source_file: 'package.json' });
  }
  
  if (allDeps['openai']) {
    stack.push({ layer: 'ai_model', technology: 'OpenAI', version: allDeps['openai'], source_file: 'package.json', notes: 'API integration' });
  }

  let transitiveCount = 0;
  const lockPath = filePath.replace('package.json', 'package-lock.json');
  if (fs.existsSync(lockPath)) {
    try {
      const lock = JSON.parse(fs.readFileSync(lockPath, 'utf8'));
      transitiveCount = Object.keys(lock.packages || lock.dependencies || {}).length;
    } catch (e) {
      transitiveCount = 0;
    }
  }

  return {
    name: pkg.name || 'unknown',
    version: pkg.version || '0.1.0',
    description: pkg.description || '',
    author: pkg.author || '',
    license: pkg.license || 'UNLICENSED',
    dependencies: allDeps,
    directCount: Object.keys(dependencies).length,
    transitiveCount: Math.max(0, transitiveCount - 1),
    stack
  };
}

module.exports = { parsePackageJson };
