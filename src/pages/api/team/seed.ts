import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { teamMembers } from '../../../data/team';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session || session.user.role !== 'ADMIN') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    let added = 0;
    let skipped = 0;

    for (let i = 0; i < teamMembers.length; i++) {
      const member = teamMembers[i];
      const existing = await prisma.teamMember.findFirst({
        where: { name: member.name }
      });

      if (existing) {
        skipped++;
        continue;
      }

      // Derive department from position
      const departmentMap: Record<string, string> = {
        'CEO & Founder': 'Management',
        'Operations Manager': 'Operations',
        'Finance Manager': 'Finance',
        'Design Manager': 'Engineering',
        'Sales Manager': 'Sales',
        'Projects Manager': 'Projects',
        'Supply Chain Manager': 'Supply Chain',
        'Business Development': 'Business Development',
        'Procurement Manager': 'Procurement',
      };

      await prisma.teamMember.create({
        data: {
          name: member.name,
          position: member.position,
          department: departmentMap[member.position] || 'General',
          bio: member.bio,
          linkedin: member.linkedinUrl,
          avatar: member.image,
          order: i,
          featured: i < 3,
        }
      });
      added++;
    }

    return res.status(200).json({ added, skipped });
  } catch (error) {
    console.error('Error seeding team members:', error);
    return res.status(500).json({ error: 'Failed to seed team members' });
  }
}
