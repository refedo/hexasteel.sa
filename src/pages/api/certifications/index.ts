import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET': {
      try {
        const certs = await prisma.certification.findMany({
          where: { active: true },
          orderBy: { order: 'asc' },
        });
        return res.status(200).json(certs);
      } catch (error) {
        console.error('Error fetching certifications:', error);
        return res.status(500).json({ error: 'Failed to fetch certifications' });
      }
    }

    case 'POST': {
      const session = await getServerSession(req, res, authOptions);
      if (!session) return res.status(401).json({ error: 'Unauthorized' });

      try {
        const cert = await prisma.certification.create({ data: req.body });
        return res.status(201).json(cert);
      } catch (error) {
        console.error('Error creating certification:', error);
        return res.status(500).json({ error: 'Failed to create certification' });
      }
    }

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
