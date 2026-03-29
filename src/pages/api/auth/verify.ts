import type { NextApiRequest, NextApiResponse } from 'next';
import { compare } from 'bcryptjs';
import prisma from '../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    console.log('Direct auth attempt for:', email);

    // Find user in database
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      console.log('User not found:', email);
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    if (!user.isActive) {
      console.log('User is not active:', email);
      return res.status(401).json({ error: 'Account is not active' });
    }

    // Verify password
    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      console.log('Invalid password for user:', email);
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    console.log('Direct auth successful for:', email);

    // Return user data (excluding password)
    const { password: _, ...userWithoutPassword } = user;
    
    return res.status(200).json({
      success: true,
      user: userWithoutPassword,
    });

  } catch (error) {
    console.error('Direct auth error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
