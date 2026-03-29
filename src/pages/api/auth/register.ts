import type { NextApiRequest, NextApiResponse } from 'next';
import { hash } from 'bcryptjs';
import prisma from '../../../lib/prisma';

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

    // Check if user already exists using Prisma
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await hash(password, 12);

    // Create user using Prisma
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role: 'ADMIN', // Set role as admin (using enum value from Prisma schema)
      },
    });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    res.status(201).json(userWithoutPassword);
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
}
