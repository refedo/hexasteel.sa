// This script creates an admin user directly using Prisma
// Run with: node scripts/create-admin-direct.js

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createAdminUser() {
  try {
    console.log('Checking if admin user already exists...');
    
    const existingUser = await prisma.user.findUnique({
      where: { email: 'admin@hexasteel.sa' }
    });
    
    if (existingUser) {
      console.log('Admin user already exists.');
      return;
    }
    
    console.log('Creating admin user...');
    
    // Hash the password
    const hashedPassword = await bcrypt.hash('Admin@123', 12);
    
    // Create the admin user
    const user = await prisma.user.create({
      data: {
        name: 'Admin',
        email: 'admin@hexasteel.sa',
        password: hashedPassword,
        role: 'ADMIN',
        isActive: true
      }
    });
    
    console.log('Admin user created successfully:');
    console.log({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    });
    
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdminUser();
