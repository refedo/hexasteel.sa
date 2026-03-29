import { NextApiRequest, NextApiResponse } from 'next';
import { compare } from 'bcryptjs';
import prisma from '../../lib/prisma';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  password: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email, password } = req.body;
    console.log('Testing login for:', email);

    
    
    const user = await prisma.user.findUnique({ where: { email } });
    console.log('Found user:', user ? 'yes' : 'no');

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    const isValid = await compare(password, user.password);
    console.log('Password valid:', isValid);

    if (!isValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    return res.status(200).json({ 
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Test login error:', error);
    return res.status(500).json({ 
      message: 'Login test failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
