import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import prisma from '../../../lib/prisma';

const defaultCertifications = [
  {
    name: 'ISO 9001:2015',
    category: 'Quality Management',
    description: 'International standard for Quality Management Systems (QMS), demonstrating our commitment to consistent quality and customer satisfaction.',
    validUntil: '2026',
    icon: '🏅',
    benefits: ['Standardized quality processes', 'Enhanced customer satisfaction', 'Continuous improvement culture', 'Risk-based thinking approach'],
    order: 0,
  },
  {
    name: 'ISO 14001:2015',
    category: 'Environmental Management',
    description: 'Certification for Environmental Management System (EMS), showcasing our dedication to environmental responsibility and sustainability.',
    validUntil: '2026',
    icon: '🌿',
    benefits: ['Environmental impact reduction', 'Resource efficiency', 'Regulatory compliance', 'Sustainable practices'],
    order: 1,
  },
  {
    name: 'ISO 45001:2018',
    category: 'Occupational Health & Safety',
    description: 'International standard for Occupational Health and Safety Management Systems, ensuring a safe and healthy workplace.',
    validUntil: '2026',
    icon: '⚕️',
    benefits: ['Workplace safety enhancement', 'Risk prevention', 'Employee wellbeing', 'Legal compliance'],
    order: 2,
  },
  {
    name: 'CSWIP',
    category: 'Welding Inspection',
    description: 'Certification Scheme for Welding Inspection Personnel, validating our expertise in welding inspection and quality control.',
    validUntil: 'Ongoing',
    icon: '⚡',
    benefits: ['Expert welding inspection', 'Quality assurance', 'International recognition', 'Technical expertise'],
    order: 3,
  },
  {
    name: 'AWS CWI',
    category: 'Welding Inspection',
    description: 'Certified Welding Inspector certification from the American Welding Society, demonstrating our welding inspection capabilities.',
    validUntil: 'Ongoing',
    icon: '🔍',
    benefits: ['Comprehensive inspection skills', 'Code compliance expertise', 'Quality control assurance', 'Industry recognition'],
    order: 4,
  },
  {
    name: 'ASCI',
    category: 'Steel Construction',
    description: 'American Steel Construction Institute certification, validating our expertise in steel construction and fabrication.',
    validUntil: 'Ongoing',
    icon: '🏗️',
    benefits: ['Steel construction expertise', 'Industry best practices', 'Technical competency', 'Quality standards'],
    order: 5,
  },
  {
    name: 'LEED',
    category: 'Sustainable Building',
    description: 'Leadership in Energy and Environmental Design certification, demonstrating our commitment to sustainable construction practices.',
    validUntil: 'Ongoing',
    icon: '🌱',
    benefits: ['Sustainable practices', 'Energy efficiency', 'Environmental responsibility', 'Green building expertise'],
    order: 6,
  },
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ error: 'Unauthorized' });

  try {
    let added = 0;
    let skipped = 0;

    for (const cert of defaultCertifications) {
      const existing = await prisma.certification.findFirst({ where: { name: cert.name } });
      if (existing) { skipped++; continue; }
      await prisma.certification.create({ data: cert });
      added++;
    }

    return res.status(200).json({ added, skipped });
  } catch (error) {
    console.error('Error seeding certifications:', error);
    return res.status(500).json({ error: 'Failed to seed certifications' });
  }
}
