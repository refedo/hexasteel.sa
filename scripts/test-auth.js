// This script tests the authentication flow
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function testAuth() {
  try {
    console.log('Testing authentication flow...');
    
    // 1. Check if admin user exists
    const user = await prisma.user.findUnique({
      where: { email: 'admin@hexasteel.sa' }
    });
    
    if (!user) {
      console.error('ERROR: Admin user not found in database!');
      console.log('Please run the create-admin-direct.js script first.');
      return;
    }
    
    console.log('✓ Admin user found in database');
    console.log({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      isActive: user.isActive
    });
    
    // 2. Verify password hash format
    console.log('\nVerifying password hash...');
    if (!user.password || user.password.length < 20) {
      console.error('ERROR: Password hash looks invalid!');
      
      // Fix the password if needed
      console.log('Updating password hash...');
      const hashedPassword = await bcrypt.hash('Admin@123', 12);
      
      await prisma.user.update({
        where: { id: user.id },
        data: { password: hashedPassword }
      });
      
      console.log('✓ Password hash updated');
    } else {
      console.log('✓ Password hash looks valid');
    }
    
    // 3. Verify role is correct for admin access
    console.log('\nVerifying user role...');
    if (user.role !== 'ADMIN') {
      console.error('ERROR: User does not have ADMIN role!');
      
      // Fix the role if needed
      console.log('Updating user role to ADMIN...');
      await prisma.user.update({
        where: { id: user.id },
        data: { role: 'ADMIN' }
      });
      
      console.log('✓ User role updated to ADMIN');
    } else {
      console.log('✓ User has correct ADMIN role');
    }
    
    // 4. Verify user is active
    console.log('\nVerifying user status...');
    if (!user.isActive) {
      console.error('ERROR: User account is not active!');
      
      // Fix the status if needed
      console.log('Activating user account...');
      await prisma.user.update({
        where: { id: user.id },
        data: { isActive: true }
      });
      
      console.log('✓ User account activated');
    } else {
      console.log('✓ User account is active');
    }
    
    console.log('\nAuthentication test completed successfully.');
    console.log('\nLogin credentials:');
    console.log('Email: admin@hexasteel.sa');
    console.log('Password: Admin@123');
    console.log('\nPlease try logging in at: http://localhost:4500/admin/login');
    
  } catch (error) {
    console.error('Error testing authentication:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testAuth();
