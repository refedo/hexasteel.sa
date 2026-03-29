// Script to set up the database and run migrations
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔄 Setting up the database...');

// Check if .env file exists
const envPath = path.join(__dirname, '..', '.env');
if (!fs.existsSync(envPath)) {
  console.error('❌ .env file not found. Please create it with your database connection string.');
  console.log('Example: DATABASE_URL="postgresql://username:password@localhost:5432/hexasteel?schema=public"');
  process.exit(1);
}

try {
  // Generate Prisma client
  console.log('📦 Generating Prisma client...');
  execSync('npx prisma generate', { stdio: 'inherit' });

  // Run migrations
  console.log('🚀 Running database migrations...');
  execSync('npx prisma migrate dev --name init', { stdio: 'inherit' });

  console.log('✅ Database setup complete!');
} catch (error) {
  console.error('❌ Error setting up the database:', error.message);
  process.exit(1);
}
