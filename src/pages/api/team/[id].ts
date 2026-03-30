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

  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const member = await prisma.teamMember.findUnique({
        where: { id: id as string }
      });
      if (!member) {
        return res.status(404).json({ error: 'Team member not found' });
      }
      return res.status(200).json(member);
    } catch (error) {
      console.error('Error fetching team member:', error);
      return res.status(500).json({ error: 'Failed to fetch team member' });
    }
  }

  if (req.method === 'PUT') {
    try {
      const member = await prisma.teamMember.update({
        where: { id: id as string },
        data: req.body
      });
      return res.status(200).json(member);
    } catch (error) {
      console.error('Error updating team member:', error);
      return res.status(500).json({ error: 'Failed to update team member' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      await prisma.teamMember.delete({
        where: { id: id as string }
      });
      return res.status(204).end();
    } catch (error) {
      console.error('Error deleting team member:', error);
      return res.status(500).json({ error: 'Failed to delete team member' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
