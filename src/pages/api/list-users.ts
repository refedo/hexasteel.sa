import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Using Prisma instead of Mongoose
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        avatar: true,
        isActive: true,
        lastLogin: true,
        createdAt: true,
        updatedAt: true,
        // Exclude password field
      },
    });
    
    console.log('Found users:', users);

    return res.status(200).json({ 
      message: 'Users retrieved successfully',
      users
    });
  } catch (error) {
    console.error('Error listing users:', error);
    return res.status(500).json({ 
      message: 'Error retrieving users',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
