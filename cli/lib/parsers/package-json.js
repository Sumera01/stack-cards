const fs = require('fs');

function cleanVersion(v) {
  if (!v) return 'unknown';
  // Strip ^, ~, >=, <=, >, <, =, spaces
  let cleaned = v.replace(/^[\^~>=<\s]+/, '');
  // Extract first valid semver (e.g., "1.2.3" from ">=1.0.0 <2.0.0")
  const match = cleaned.match(/(\d+\.\d+\.\d+)/);
  return match ? match[1] : cleaned;
}

function parsePackageJson(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const pkg = JSON.parse(content);

  const dependencies = pkg.dependencies || {};
  const devDependencies = pkg.devDependencies || {};
  const allDeps = { ...dependencies, ...devDependencies };

  const stack = [];
  
  // Frontend frameworks
  if (allDeps['next'] || allDeps['nextjs']) {
    stack.push({ layer: 'frontend', technology: 'Next.js', version: cleanVersion(allDeps['next']), source_file: 'package.json' });
    stack.push({ layer: 'backend', technology: 'Next.js API Routes', version: cleanVersion(allDeps['next']), source_file: 'package.json' });
  } else if (allDeps['react']) {
    stack.push({ layer: 'frontend', technology: 'React', version: cleanVersion(allDeps['react']), source_file: 'package.json' });
  }
  
  if (allDeps['vue']) {
    stack.push({ layer: 'frontend', technology: 'Vue.js', version: cleanVersion(allDeps['vue']), source_file: 'package.json' });
  }
  
  if (allDeps['svelte']) {
    stack.push({ layer: 'frontend', technology: 'Svelte', version: cleanVersion(allDeps['svelte']), source_file: 'package.json' });
  }
  
  // Build tools
  if (allDeps['vite'] || allDeps['@vitejs/plugin-react']) {
    stack.push({ layer: 'build', technology: 'Vite', version: cleanVersion(allDeps['vite']), source_file: 'package.json' });
  }
  
  if (allDeps['webpack']) {
    stack.push({ layer: 'build', technology: 'Webpack', version: cleanVersion(allDeps['webpack']), source_file: 'package.json' });
  }
  
  if (allDeps['parcel']) {
    stack.push({ layer: 'build', technology: 'Parcel', version: cleanVersion(allDeps['parcel']), source_file: 'package.json' });
  }
  
  // Styling
  if (allDeps['tailwindcss'] || allDeps['tailwind-css']) {
    stack.push({ layer: 'styling', technology: 'Tailwind CSS', version: cleanVersion(allDeps['tailwindcss'] || allDeps['tailwind-css']), source_file: 'package.json' });
  }
  
  if (allDeps['sass'] || allDeps['node-sass']) {
    stack.push({ layer: 'styling', technology: 'Sass', version: cleanVersion(allDeps['sass'] || allDeps['node-sass']), source_file: 'package.json' });
  }
  
  if (allDeps['styled-components']) {
    stack.push({ layer: 'styling', technology: 'Styled Components', version: cleanVersion(allDeps['styled-components']), source_file: 'package.json' });
  }
  
  // Backend
  if (allDeps['express']) {
    stack.push({ layer: 'backend', technology: 'Express.js', version: cleanVersion(allDeps['express']), source_file: 'package.json' });
  }
  
  if (allDeps['fastify']) {
    stack.push({ layer: 'backend', technology: 'Fastify', version: cleanVersion(allDeps['fastify']), source_file: 'package.json' });
  }
  
  if (allDeps['koa']) {
    stack.push({ layer: 'backend', technology: 'Koa', version: cleanVersion(allDeps['koa']), source_file: 'package.json' });
  }
  
  // Database / ORM
  if (allDeps['prisma'] || allDeps['@prisma/client']) {
    stack.push({ layer: 'database', technology: 'Prisma', version: cleanVersion(allDeps['prisma'] || allDeps['@prisma/client']), source_file: 'package.json' });
  }
  
  if (allDeps['mongoose']) {
    stack.push({ layer: 'database', technology: 'Mongoose', version: cleanVersion(allDeps['mongoose']), source_file: 'package.json' });
  }
  
  if (allDeps['sequelize']) {
    stack.push({ layer: 'database', technology: 'Sequelize', version: cleanVersion(allDeps['sequelize']), source_file: 'package.json' });
  }
  
  if (allDeps['drizzle-orm']) {
    stack.push({ layer: 'database', technology: 'Drizzle ORM', version: cleanVersion(allDeps['drizzle-orm']), source_file: 'package.json' });
  }
  
  // Auth
  if (allDeps['@clerk/nextjs'] || allDeps['@clerk/clerk-react']) {
    stack.push({ layer: 'auth', technology: 'Clerk', version: cleanVersion(allDeps['@clerk/nextjs'] || allDeps['@clerk/clerk-react']), source_file: 'package.json' });
  } else if (allDeps['next-auth'] || allDeps['nextauth']) {
    stack.push({ layer: 'auth', technology: 'NextAuth.js', version: cleanVersion(allDeps['next-auth'] || allDeps['nextauth']), source_file: 'package.json' });
  } else if (allDeps['@auth0/auth0-react']) {
    stack.push({ layer: 'auth', technology: 'Auth0', version: cleanVersion(allDeps['@auth0/auth0-react']), source_file: 'package.json' });
  } else if (allDeps['firebase']) {
    stack.push({ layer: 'auth', technology: 'Firebase Auth', version: cleanVersion(allDeps['firebase']), source_file: 'package.json' });
  } else if (allDeps['supabase'] || allDeps['@supabase/supabase-js']) {
    stack.push({ layer: 'auth', technology: 'Supabase Auth', version: cleanVersion(allDeps['supabase'] || allDeps['@supabase/supabase-js']), source_file: 'package.json' });
  }
  
  // AI / ML
  if (allDeps['openai']) {
    stack.push({ layer: 'ai_model', technology: 'OpenAI', version: cleanVersion(allDeps['openai']), source_file: 'package.json', notes: 'API integration' });
  }
  
  if (allDeps['@anthropic-ai/sdk'] || allDeps['@anthropic-ai/anthropic']) {
    stack.push({ layer: 'ai_model', technology: 'Anthropic Claude', version: cleanVersion(allDeps['@anthropic-ai/sdk'] || allDeps['@anthropic-ai/anthropic']), source_file: 'package.json', notes: 'API integration' });
  }
  
  if (allDeps['@google/generative-ai'] || allDeps['google-generative-ai']) {
    stack.push({ layer: 'ai_model', technology: 'Google Gemini', version: cleanVersion(allDeps['@google/generative-ai'] || allDeps['google-generative-ai']), source_file: 'package.json', notes: 'API integration' });
  }
  
  if (allDeps['langchain'] || allDeps['@langchain/core']) {
    stack.push({ layer: 'ai_model', technology: 'LangChain', version: cleanVersion(allDeps['langchain'] || allDeps['@langchain/core']), source_file: 'package.json', notes: 'AI orchestration' });
  }
  
  // State management
  if (allDeps['@reduxjs/toolkit'] || allDeps['react-redux']) {
    stack.push({ layer: 'state', technology: 'Redux Toolkit', version: cleanVersion(allDeps['@reduxjs/toolkit'] || allDeps['react-redux']), source_file: 'package.json' });
  }
  
  if (allDeps['zustand']) {
    stack.push({ layer: 'state', technology: 'Zustand', version: cleanVersion(allDeps['zustand']), source_file: 'package.json' });
  }
  
  if (allDeps['jotai']) {
    stack.push({ layer: 'state', technology: 'Jotai', version: cleanVersion(allDeps['jotai']), source_file: 'package.json' });
  }
  
  if (allDeps['recoil']) {
    stack.push({ layer: 'state', technology: 'Recoil', version: cleanVersion(allDeps['recoil']), source_file: 'package.json' });
  }
  
  // HTTP / API
  if (allDeps['axios']) {
    stack.push({ layer: 'http', technology: 'Axios', version: cleanVersion(allDeps['axios']), source_file: 'package.json' });
  }
  
  if (allDeps['@tanstack/react-query'] || allDeps['react-query']) {
    stack.push({ layer: 'http', technology: 'TanStack Query', version: cleanVersion(allDeps['@tanstack/react-query'] || allDeps['react-query']), source_file: 'package.json' });
  }
  
  if (allDeps['swr']) {
    stack.push({ layer: 'http', technology: 'SWR', version: cleanVersion(allDeps['swr']), source_file: 'package.json' });
  }
  
  if (allDeps['graphql'] || allDeps['@apollo/client']) {
    stack.push({ layer: 'http', technology: 'Apollo GraphQL', version: cleanVersion(allDeps['@apollo/client'] || allDeps['graphql']), source_file: 'package.json' });
  }
  
  if (allDeps['trpc'] || allDeps['@trpc/client']) {
    stack.push({ layer: 'http', technology: 'tRPC', version: cleanVersion(allDeps['trpc'] || allDeps['@trpc/client']), source_file: 'package.json' });
  }
  
  // Charts / Data viz
  if (allDeps['recharts']) {
    stack.push({ layer: 'charts', technology: 'Recharts', version: cleanVersion(allDeps['recharts']), source_file: 'package.json' });
  }
  
  if (allDeps['chart.js'] || allDeps['chartjs']) {
    stack.push({ layer: 'charts', technology: 'Chart.js', version: cleanVersion(allDeps['chart.js'] || allDeps['chartjs']), source_file: 'package.json' });
  }
  
  if (allDeps['d3']) {
    stack.push({ layer: 'charts', technology: 'D3.js', version: cleanVersion(allDeps['d3']), source_file: 'package.json' });
  }
  
  if (allDeps['victory']) {
    stack.push({ layer: 'charts', technology: 'Victory', version: cleanVersion(allDeps['victory']), source_file: 'package.json' });
  }
  
  // Animation
  if (allDeps['framer-motion']) {
    stack.push({ layer: 'animation', technology: 'Framer Motion', version: cleanVersion(allDeps['framer-motion']), source_file: 'package.json' });
  }
  
  if (allDeps['gsap']) {
    stack.push({ layer: 'animation', technology: 'GSAP', version: cleanVersion(allDeps['gsap']), source_file: 'package.json' });
  }
  
  // Routing
  if (allDeps['react-router'] || allDeps['react-router-dom']) {
    stack.push({ layer: 'routing', technology: 'React Router', version: cleanVersion(allDeps['react-router'] || allDeps['react-router-dom']), source_file: 'package.json' });
  }
  
  if (allDeps['vue-router']) {
    stack.push({ layer: 'routing', technology: 'Vue Router', version: cleanVersion(allDeps['vue-router']), source_file: 'package.json' });
  }
  
  // Validation
  if (allDeps['zod']) {
    stack.push({ layer: 'validation', technology: 'Zod', version: cleanVersion(allDeps['zod']), source_file: 'package.json' });
  }
  
  if (allDeps['yup']) {
    stack.push({ layer: 'validation', technology: 'Yup', version: cleanVersion(allDeps['yup']), source_file: 'package.json' });
  }
  
  if (allDeps['joi']) {
    stack.push({ layer: 'validation', technology: 'Joi', version: cleanVersion(allDeps['joi']), source_file: 'package.json' });
  }
  
  // Icons
  if (allDeps['lucide-react'] || allDeps['lucide']) {
    stack.push({ layer: 'icons', technology: 'Lucide', version: cleanVersion(allDeps['lucide-react'] || allDeps['lucide']), source_file: 'package.json' });
  }
  
  if (allDeps['@heroicons/react'] || allDeps['heroicons']) {
    stack.push({ layer: 'icons', technology: 'Heroicons', version: cleanVersion(allDeps['@heroicons/react'] || allDeps['heroicons']), source_file: 'package.json' });
  }
  
  if (allDeps['react-icons']) {
    stack.push({ layer: 'icons', technology: 'React Icons', version: cleanVersion(allDeps['react-icons']), source_file: 'package.json' });
  }
  
  // UI Components
  if (allDeps['@mui/material'] || allDeps['@material-ui/core']) {
    stack.push({ layer: 'ui', technology: 'Material-UI', version: cleanVersion(allDeps['@mui/material'] || allDeps['@material-ui/core']), source_file: 'package.json' });
  }
  
  if (allDeps['@chakra-ui/react'] || allDeps['@chakra-ui/core']) {
    stack.push({ layer: 'ui', technology: 'Chakra UI', version: cleanVersion(allDeps['@chakra-ui/react'] || allDeps['@chakra-ui/core']), source_file: 'package.json' });
  }
  
  if (allDeps['antd']) {
    stack.push({ layer: 'ui', technology: 'Ant Design', version: cleanVersion(allDeps['antd']), source_file: 'package.json' });
  }
  
  if (allDeps['shadcn-ui'] || allDeps['@shadcn/ui']) {
    stack.push({ layer: 'ui', technology: 'shadcn/ui', version: cleanVersion(allDeps['shadcn-ui'] || allDeps['@shadcn/ui']), source_file: 'package.json' });
  }
  
  if (allDeps['radix-ui'] || allDeps['@radix-ui/react-primitive']) {
    stack.push({ layer: 'ui', technology: 'Radix UI', version: cleanVersion(allDeps['radix-ui'] || allDeps['@radix-ui/react-primitive']), source_file: 'package.json' });
  }
  
  // Testing
  if (allDeps['jest'] || allDeps['@jest/globals']) {
    stack.push({ layer: 'testing', technology: 'Jest', version: cleanVersion(allDeps['jest'] || allDeps['@jest/globals']), source_file: 'package.json' });
  }
  
  if (allDeps['vitest']) {
    stack.push({ layer: 'testing', technology: 'Vitest', version: cleanVersion(allDeps['vitest']), source_file: 'package.json' });
  }
  
  if (allDeps['cypress']) {
    stack.push({ layer: 'testing', technology: 'Cypress', version: cleanVersion(allDeps['cypress']), source_file: 'package.json' });
  }
  
  if (allDeps['@playwright/test'] || allDeps['playwright']) {
    stack.push({ layer: 'testing', technology: 'Playwright', version: cleanVersion(allDeps['@playwright/test'] || allDeps['playwright']), source_file: 'package.json' });
  }
  
  // Hosting / Deployment
  if (allDeps['vercel'] || allDeps['@vercel/node']) {
    stack.push({ layer: 'hosting', technology: 'Vercel', version: cleanVersion(allDeps['vercel'] || allDeps['@vercel/node']), source_file: 'package.json' });
  }
  
  if (allDeps['netlify-cli'] || allDeps['@netlify/functions']) {
    stack.push({ layer: 'hosting', technology: 'Netlify', version: cleanVersion(allDeps['netlify-cli'] || allDeps['@netlify/functions']), source_file: 'package.json' });
  }
  
  if (allDeps['serverless'] || allDeps['serverless-http']) {
    stack.push({ layer: 'hosting', technology: 'Serverless', version: cleanVersion(allDeps['serverless'] || allDeps['serverless-http']), source_file: 'package.json' });
  }

  // Count transitive deps from lockfile if present
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