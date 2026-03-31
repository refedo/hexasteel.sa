import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  switch (req.method) {
    case 'GET': {
      try {
        const item = await prisma.knowledgeContent.findUnique({ where: { id: id as string } });
        if (!item) return res.status(404).json({ error: 'Not found' });
        return res.status(200).json(item);
      } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch article' });
      }
    }

    case 'PUT': {
      const session = await getServerSession(req, res, authOptions);
      if (!session) return res.status(401).json({ error: 'Unauthorized' });
      try {
        const item = await prisma.knowledgeContent.update({
          where: { id: id as string },
          data: req.body,
        });
        return res.status(200).json(item);
      } catch (error) {
        return res.status(500).json({ error: 'Failed to update article' });
      }
    }

    case 'DELETE': {
      const session = await getServerSession(req, res, authOptions);
      if (!session) return res.status(401).json({ error: 'Unauthorized' });
      try {
        await prisma.knowledgeContent.delete({ where: { id: id as string } });
        return res.status(200).json({ success: true });
      } catch (error) {
        return res.status(500).json({ error: 'Failed to delete article' });
      }
    }

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
