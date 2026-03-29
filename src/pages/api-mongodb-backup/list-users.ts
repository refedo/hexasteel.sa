import { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '../../lib/mongodb';
import User from '../../models/User';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectDB();
    
    const users = await User.find({}, { password: 0 }); // Exclude password field
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
