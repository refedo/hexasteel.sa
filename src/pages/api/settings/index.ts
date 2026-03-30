import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session || session.user.role !== 'ADMIN') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    try {
      const { key } = req.query;
      
      if (key) {
        const setting = await prisma.settings.findUnique({
          where: { key: key as string }
        });
        return res.status(200).json(setting);
      }
      
      const settings = await prisma.settings.findMany();
      return res.status(200).json(settings);
    } catch (error) {
      console.error('Error fetching settings:', error);
      return res.status(500).json({ error: 'Failed to fetch settings' });
    }
  }

  if (req.method === 'POST' || req.method === 'PUT') {
    try {
      const { key, value, type } = req.body;
      
      const setting = await prisma.settings.upsert({
        where: { key },
        update: { value, type },
        create: { key, value, type }
      });
      
      return res.status(200).json(setting);
    } catch (error) {
      console.error('Error saving setting:', error);
      return res.status(500).json({ error: 'Failed to save setting' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
