import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ error: 'Unauthorized' });

  switch (req.method) {
    case 'PUT': {
      try {
        const item = await prisma.fAQItem.update({
          where: { id: id as string },
          data: req.body,
        });
        return res.status(200).json(item);
      } catch (error) {
        return res.status(500).json({ error: 'Failed to update FAQ item' });
      }
    }

    case 'DELETE': {
      try {
        await prisma.fAQItem.delete({ where: { id: id as string } });
        return res.status(200).json({ success: true });
      } catch (error) {
        return res.status(500).json({ error: 'Failed to delete FAQ item' });
      }
    }

    default:
      res.setHeader('Allow', ['PUT', 'DELETE']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
