import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // TODO: Implement job applications table in Prisma schema
    // For now, return a placeholder response
    
    res.status(201).json({ 
      success: true, 
      message: 'Application feature coming soon. Please email your resume to careers@hexasteel.sa',
    });
  } catch (error) {
    console.error('Error submitting application:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error submitting application. Please try again later.' 
    });
  }
}
