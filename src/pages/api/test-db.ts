import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';
import mongoose from 'mongoose';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    console.log('Testing MongoDB connection...');
    console.log('MongoDB URI:', process.env.MONGODB_URI);
    
    
    
    // List all collections
    const collections = await mongoose.connection.db.collections();
    console.log('Collections:', collections.map(c => c.collectionName));
    
    // Get database stats
    const stats = await mongoose.connection.db.stats();
    console.log('Database stats:', stats);

    return res.status(200).json({ 
      message: 'Database connection successful',
      collections: collections.map(c => c.collectionName),
      stats
    });
  } catch (error) {
    console.error('Database test error:', error);
    return res.status(500).json({ 
      message: 'Database connection failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
