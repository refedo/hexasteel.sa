import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET': {
      try {
        const items = await prisma.fAQItem.findMany({
          where: { active: true },
          orderBy: { order: 'asc' },
        });
        return res.status(200).json(items);
      } catch (error) {
        console.error('Error fetching FAQ items:', error);
        return res.status(500).json({ error: 'Failed to fetch FAQ items' });
      }
    }

    case 'POST': {
      const session = await getServerSession(req, res, authOptions);
      if (!session) return res.status(401).json({ error: 'Unauthorized' });

      try {
        const item = await prisma.fAQItem.create({ data: req.body });
        return res.status(201).json(item);
      } catch (error) {
        console.error('Error creating FAQ item:', error);
        return res.status(500).json({ error: 'Failed to create FAQ item' });
      }
    }

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
