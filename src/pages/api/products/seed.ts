import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import prisma from '../../../lib/prisma';
import { products } from '../../../data/products';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ error: 'Unauthorized' });

  try {
    let added = 0;
    let skipped = 0;

    for (const product of products) {
      const existing = await prisma.product.findFirst({ where: { slug: product.id } });
      if (existing) { skipped++; continue; }

      await prisma.product.create({
        data: {
          name: product.name,
          slug: product.id,
          description: product.description,
          category: product.category,
          features: product.features,
          images: [product.image],
          featured: false,
        },
      });
      added++;
    }

    return res.status(200).json({ added, skipped });
  } catch (error) {
    console.error('Error seeding products:', error);
    return res.status(500).json({ error: 'Failed to seed products' });
  }
}
