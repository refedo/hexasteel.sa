import { NextApiRequest, NextApiResponse } from 'next';
import { hash } from 'bcryptjs';
import prisma from '../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    

    // Create admin user
    const password = 'Admin@123';
    const hashedPassword = await hash(password, 12);
    const adminUser = await prisma.user.create({
      data: {
        name: 'Admin User',
        email: 'admin@hexasteel.sa',
        password: hashedPassword,
        role: 'ADMIN',
        isActive: true,
      },
    });

    console.log('Created admin user:', {
      email: adminUser.email,
      role: adminUser.role,
      hashedPassword: adminUser.password.substring(0, 10) + '...',
    });

    return res.status(200).json({ 
      message: 'Admin user created successfully',
      user: {
        email: adminUser.email,
        role: adminUser.role
      }
    });
  } catch (error) {
    console.error('Setup error:', error);
    return res.status(500).json({ 
      message: 'Error setting up admin user',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
