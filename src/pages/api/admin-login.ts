import type { NextApiRequest, NextApiResponse } from 'next';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import prisma from '../../lib/prisma';
import cookie from 'cookie';

// This is a simplified direct login endpoint that doesn't rely on NextAuth
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create a JWT token
    const token = sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      process.env.NEXTAUTH_SECRET || 'hexasteel-jwt-secret',
      { expiresIn: '1d' }
    );

    // Set cookie
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('admin-token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 86400, // 1 day
        path: '/',
      })
    );

    return res.status(200).json({
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
