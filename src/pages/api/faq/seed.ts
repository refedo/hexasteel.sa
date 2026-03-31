import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import prisma from '../../../lib/prisma';

const defaultFAQs = [
  {
    question: 'What types of steel structures do you manufacture?',
    answer: 'We manufacture a wide range of steel structures including industrial buildings, warehouses, commercial complexes, steel bridges, high-rise buildings, and custom steel solutions. Our capabilities extend to both standard and specialized designs to meet specific project requirements.',
    category: 'products',
    order: 0,
  },
  {
    question: 'What is your typical project timeline?',
    answer: 'Project timelines vary depending on the scope and complexity of the work. Typically, small to medium projects take 2-3 months from design to completion, while larger projects may take 4-6 months. We provide detailed timelines during the initial consultation phase.',
    category: 'projects',
    order: 1,
  },
  {
    question: 'Do you provide installation services?',
    answer: 'Yes, we offer comprehensive installation services with our experienced team of professionals. We handle everything from site preparation to final assembly, ensuring proper installation and adherence to safety standards.',
    category: 'services',
    order: 2,
  },
  {
    question: 'What quality standards do you follow?',
    answer: 'We adhere to international quality standards including ISO 9001:2015 and follow strict quality control procedures. All our steel structures are manufactured using high-grade materials and undergo rigorous testing to ensure durability and safety.',
    category: 'quality',
    order: 3,
  },
  {
    question: 'Can you handle custom design requirements?',
    answer: 'Absolutely! We specialize in custom steel structure solutions. Our engineering team works closely with clients to understand their specific needs and develops tailored designs that meet both functional requirements and aesthetic preferences.',
    category: 'services',
    order: 4,
  },
  {
    question: 'What warranty do you offer on your structures?',
    answer: 'We provide a standard 10-year warranty on structural integrity and a 5-year warranty on fabrication quality. Additional warranty options are available based on project specifications and requirements.',
    category: 'general',
    order: 5,
  },
  {
    question: 'Do you provide maintenance services?',
    answer: 'Yes, we offer comprehensive maintenance services including regular inspections, repairs, and preventive maintenance programs. Our maintenance team ensures your steel structure remains in optimal condition throughout its lifecycle.',
    category: 'services',
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

    for (const faq of defaultFAQs) {
      const existing = await prisma.fAQItem.findFirst({ where: { question: faq.question } });
      if (existing) { skipped++; continue; }
      await prisma.fAQItem.create({ data: faq });
      added++;
    }

    return res.status(200).json({ added, skipped });
  } catch (error) {
    console.error('Error seeding FAQ items:', error);
    return res.status(500).json({ error: 'Failed to seed FAQ items' });
  }
}
