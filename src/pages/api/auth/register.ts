import type { NextApiRequest, NextApiResponse } from 'next';
import { hash } from 'bcryptjs';
import { connectDB } from '../../../lib/mongodb';
import User from '../../../models/User';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    await connectDB();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await hash(password, 12);

    // Create user
    const user = await User.create({
      email,
      name,
      password: hashedPassword,
      role: 'admin', // Set role as admin
    });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user.toObject();

    res.status(201).json(userWithoutPassword);
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
}
