// Script to help migrate API routes from MongoDB to Prisma/PostgreSQL
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const apiDir = path.join(__dirname, '..', 'src', 'pages', 'api');
const backupDir = path.join(__dirname, '..', 'src', 'pages', 'api-mongodb-backup');

// Create backup directory if it doesn't exist
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
  console.log('✅ Created backup directory');
}

// Helper function to process a file
function processFile(filePath) {
  try {
    // Read the file content
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Create backup path
    const relativePath = path.relative(apiDir, filePath);
    const backupPath = path.join(backupDir, relativePath);
    
    // Create directory structure for backup
    const backupDirPath = path.dirname(backupPath);
    if (!fs.existsSync(backupDirPath)) {
      fs.mkdirSync(backupDirPath, { recursive: true });
    }
    
    // Backup the original file
    fs.writeFileSync(backupPath, content);
    
    // Check if file already uses Prisma
    if (content.includes('import prisma from')) {
      console.log(`⏭️  Skipping ${relativePath} - already using Prisma`);
      return;
    }
    
    // Replace MongoDB imports with Prisma
    let updatedContent = content;
    
    // Replace MongoDB connection
    updatedContent = updatedContent.replace(
      /import\s+{\s*connectDB\s*}\s+from\s+['"](.*)\/mongodb['"];?/g,
      `import prisma from '$1/prisma';`
    );
    
    // Replace model imports
    const modelRegex = /import\s+(\w+)\s+from\s+['"](.*)\/models\/\1['"];?/g;
    let match;
    while ((match = modelRegex.exec(content)) !== null) {
      // Don't need to import models with Prisma
      updatedContent = updatedContent.replace(match[0], '');
    }
    
    // Remove connectDB() calls
    updatedContent = updatedContent.replace(/await\s+connectDB\(\);?/g, '');
    
    // Write the updated content back to the file
    fs.writeFileSync(filePath, updatedContent);
    
    console.log(`✅ Processed ${relativePath}`);
    console.log('   ⚠️  Manual updates still needed for MongoDB queries');
    
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
  }
}

// Helper function to recursively process files in a directory
function processDirectory(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    
    if (entry.isDirectory()) {
      processDirectory(fullPath);
    } else if (entry.name.endsWith('.ts') && !entry.name.includes('.prisma.')) {
      processFile(fullPath);
    }
  }
}

// Main execution
console.log('🔄 Starting API routes migration helper...');
console.log('⚠️  This script will make basic changes but manual updates for queries are still needed');
console.log('💾 Original files will be backed up to src/pages/api-mongodb-backup');

try {
  processDirectory(apiDir);
  console.log('✅ Migration helper completed');
  console.log('📝 Next steps:');
  console.log('   1. Update MongoDB queries to Prisma queries');
  console.log('   2. Test each API route');
  console.log('   3. Remove backup directory when everything works');
} catch (error) {
  console.error('❌ Error during migration:', error.message);
}
