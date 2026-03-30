import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

// Public keys exposed to the frontend (non-sensitive site info)
const PUBLIC_KEYS = [
  'contactPhone',
  'contactEmail',
  'contactAddress',
  'contactPoBox',
  'contactWhatsapp',
  'contactWorkingHours',
  'facebookUrl',
  'twitterUrl',
  'linkedinUrl',
  'instagramUrl',
  'siteName',
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const settings = await prisma.settings.findMany({
      where: { key: { in: PUBLIC_KEYS } }
    });

    const result: Record<string, string> = {};
    settings.forEach(s => {
      result[s.key] = s.value;
    });

    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
    return res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching public settings:', error);
    return res.status(500).json({ error: 'Failed to fetch settings' });
  }
}
