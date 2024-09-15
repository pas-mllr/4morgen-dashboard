#!/bin/bash

# Create project structure
mkdir -p pages public styles

# Move existing files
mv dashboard.tsx pages/
mv login-page.tsx pages/login.tsx

# Create package.json
cat > package.json << EOL
{
  "name": "4morgen-dashboard",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "^13.4.7",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/node": "^20.3.1",
    "@types/react": "^18.2.13",
    "typescript": "^5.1.3"
  }
}
EOL

# Create next.config.js
cat > next.config.js << EOL
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig
EOL

# Create tsconfig.json
cat > tsconfig.json << EOL
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
EOL

# Create index.tsx
cat > pages/index.tsx << EOL
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    router.push('/login')
  }, [router])

  return null
}
EOL

# Create globals.css
cat > styles/globals.css << EOL
@tailwind base;
@tailwind components;
@tailwind utilities;
EOL

# Create .gitignore
cat > .gitignore << EOL
# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts

# Large files (adjust the size as needed)
*.mp4
*.mov
*.avi
*.wmv
*.zip
*.tar.gz
*.rar
*.7z
*.iso
*.dmg

# Ignore files larger than 100MB
**/*.{png,jpg,jpeg,gif,svg,webp,pdf}
!**/*.{png,jpg,jpeg,gif,svg,webp,pdf}
find . -type f -size +100M | sed 's/^//' >> .gitignore
EOL

# Initialize git repository
git init

# Install dependencies
npm install

# Add all files to git
git add .

# Commit changes
git commit -m "Initial Next.js project setup"

echo "Next.js project setup complete!"