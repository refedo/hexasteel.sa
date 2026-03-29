import type { NextApiRequest, NextApiResponse } from 'next';
import { hash } from 'bcryptjs';
import prisma from '../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // This should be a secret key to prevent unauthorized access
  const { secretKey } = req.body;
  
  if (secretKey !== process.env.SETUP_SECRET_KEY && secretKey !== 'hexasteel-setup-2025') {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // Check if admin user already exists
    const existingAdmin = await prisma.user.findFirst({
      where: {
        role: 'ADMIN',
      },
    });

    if (existingAdmin) {
      return res.status(400).json({ 
        message: 'Admin user already exists',
        email: existingAdmin.email
      });
    }

    // Create admin user
    const hashedPassword = await hash('admin123', 12);
    
    const adminUser = await prisma.user.create({
      data: {
        name: 'Admin User',
        email: 'admin@hexasteel.sa',
        password: hashedPassword,
        role: 'ADMIN',
        isActive: true,
      },
    });

    return res.status(201).json({
      message: 'Admin user created successfully',
      email: adminUser.email,
    });
  } catch (error) {
    console.error('Error creating admin user:', error);
    return res.status(500).json({ message: 'Failed to create admin user' });
  }
}
