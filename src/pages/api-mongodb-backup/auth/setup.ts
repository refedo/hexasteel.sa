import { NextApiRequest, NextApiResponse } from 'next';
import { hash } from 'bcryptjs';
import { connectDB } from '../../../lib/mongodb';
import User from '../../../models/User';
import mongoose from 'mongoose';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectDB();

    // Drop existing users collection
    try {
      await mongoose.connection.db.dropCollection('users');
      console.log('Dropped existing users collection');
    } catch (error) {
      console.log('No existing users collection to drop');
    }

    // Create admin user with a simple hashed password
    const password = 'Admin@123';
    const hashedPassword = await hash(password, 12);

    const admin = await User.create({
      name: 'Admin',
      email: 'admin@hexasteel.sa',
      password: hashedPassword,
      role: 'admin',
      isActive: true,
    });

    console.log('Created admin user:', {
      email: admin.email,
      role: admin.role,
      hashedPassword: admin.password.substring(0, 10) + '...',
    });

    return res.status(200).json({ 
      message: 'Admin user created successfully',
      user: {
        email: admin.email,
        role: admin.role
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
