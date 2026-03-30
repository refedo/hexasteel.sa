import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const members = await prisma.teamMember.findMany({
        orderBy: [
          { order: 'asc' },
          { createdAt: 'desc' }
        ]
      });
      return res.status(200).json(members);
    } catch (error) {
      console.error('Error fetching team members:', error);
      return res.status(500).json({ error: 'Failed to fetch team members' });
    }
  }

  if (req.method === 'POST') {
    const session = await getServerSession(req, res, authOptions);
    if (!session || session.user.role !== 'ADMIN') {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
      const member = await prisma.teamMember.create({
        data: req.body
      });
      return res.status(201).json(member);
    } catch (error) {
      console.error('Error creating team member:', error);
      return res.status(500).json({ error: 'Failed to create team member' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
