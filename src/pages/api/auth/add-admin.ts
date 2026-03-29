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
    

    // Create new admin user with a simple hashed password
    const password = 'Hexasteel@2025';
    const hashedPassword = await hash(password, 12);

    const admin = await prisma.user.create({
      data: {
        name: 'Walid',
        email: 'walid@hexasteel.sa',
        password: hashedPassword,
        role: 'ADMIN',
        isActive: true,
      },
    });

    console.log('Created additional admin user:', {
      email: admin.email,
      role: admin.role,
      hashedPassword: admin.password.substring(0, 10) + '...',
    });

    return res.status(200).json({ 
      message: 'Additional admin user created successfully',
      user: {
        email: admin.email,
        role: admin.role
      }
    });
  } catch (error) {
    console.error('Setup error:', error);
    return res.status(500).json({ 
      message: 'Error creating additional admin user',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
