import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function resetAdmin() {
  try {
    console.log('🔄 Resetting admin user credentials...\n');

    // New credentials
    const newEmail = 'admin@hexasteel.sa';
    const newPassword = 'Admin@2026';
    const hashedPassword = await hash(newPassword, 12);

    // Check if admin exists
    const existingAdmin = await prisma.user.findFirst({
      where: {
        OR: [
          { email: newEmail },
          { role: 'ADMIN' }
        ]
      }
    });

    if (existingAdmin) {
      // Update existing admin
      const updatedAdmin = await prisma.user.update({
        where: { id: existingAdmin.id },
        data: {
          email: newEmail,
          password: hashedPassword,
          name: 'Admin User',
          role: 'ADMIN',
          isActive: true,
        }
      });

      console.log('✅ Admin user updated successfully!');
      console.log('\n📧 Email:', updatedAdmin.email);
      console.log('🔑 Password:', newPassword);
      console.log('👤 Role:', updatedAdmin.role);
    } else {
      // Create new admin
      const newAdmin = await prisma.user.create({
        data: {
          email: newEmail,
          password: hashedPassword,
          name: 'Admin User',
          role: 'ADMIN',
          isActive: true,
        }
      });

      console.log('✅ Admin user created successfully!');
      console.log('\n📧 Email:', newAdmin.email);
      console.log('🔑 Password:', newPassword);
      console.log('👤 Role:', newAdmin.role);
    }

    console.log('\n✨ You can now login with these credentials.');
  } catch (error) {
    console.error('❌ Error resetting admin user:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

resetAdmin();
