import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET': {
      try {
        const { category, limit = 20, page = 1 } = req.query;
        const where: any = {};
        if (category) where.category = category;

        const skip = (Number(page) - 1) * Number(limit);
        const [items, total] = await Promise.all([
          prisma.knowledgeContent.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            skip,
            take: Number(limit),
          }),
          prisma.knowledgeContent.count({ where }),
        ]);

        return res.status(200).json({ items, total, pages: Math.ceil(total / Number(limit)) });
      } catch (error) {
        console.error('Error fetching knowledge content:', error);
        return res.status(500).json({ error: 'Failed to fetch knowledge content' });
      }
    }

    case 'POST': {
      const session = await getServerSession(req, res, authOptions);
      if (!session) return res.status(401).json({ error: 'Unauthorized' });

      try {
        const item = await prisma.knowledgeContent.create({ data: req.body });
        return res.status(201).json(item);
      } catch (error) {
        console.error('Error creating knowledge content:', error);
        return res.status(500).json({ error: 'Failed to create knowledge content' });
      }
    }

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
