import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    console.log('Testing PostgreSQL connection...');
    console.log('Database URL:', process.env.DATABASE_URL);
    
    // Test database connection by querying user count
    const userCount = await prisma.user.count();
    console.log('Users in database:', userCount);
    
    // Test project connection
    const projectCount = await prisma.project.count();
    console.log('Projects in database:', projectCount);
    return res.status(200).json({ 
      message: 'Database connection successful',
      userCount,
      projectCount
    });
  } catch (error) {
    console.error('Database test error:', error);
    return res.status(500).json({ 
      message: 'Database connection failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
