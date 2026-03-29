// This script helps set up the necessary environment variables for NextAuth
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Path to .env.local file
const envPath = path.join(__dirname, '..', '.env.local');

// Generate a secure random string for NEXTAUTH_SECRET
function generateSecret(length = 32) {
  return crypto.randomBytes(length).toString('hex');
}

// Check if .env.local exists
const envExists = fs.existsSync(envPath);

// Create or update .env.local
console.log(envExists ? 'Updating .env.local file...' : 'Creating .env.local file...');

// Define environment variables
const envVars = {
  // NextAuth configuration
  NEXTAUTH_URL: 'http://localhost:4500',
  NEXTAUTH_SECRET: generateSecret(),
  
  // Database URL (assuming PostgreSQL)
  // Update this if you're using a different database
  DATABASE_URL: 'postgresql://postgres:postgres@localhost:5432/hexasteel',
};

// Create .env.local content
let envContent = '';
Object.entries(envVars).forEach(([key, value]) => {
  envContent += `${key}=${value}\n`;
});

// Write to .env.local
fs.writeFileSync(envPath, envContent);

console.log('.env.local file has been created/updated with the following variables:');
console.log('- NEXTAUTH_URL');
console.log('- NEXTAUTH_SECRET (generated)');
console.log('- DATABASE_URL (please update if needed)');

console.log('\nIMPORTANT: After setting up the environment variables, restart your Next.js server.');
console.log('Run: npm run dev');
