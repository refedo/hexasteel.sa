import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import prisma from '../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      try {
        const { 
          category,
          status,
          featured,
          limit = 10,
          page = 1,
        } = req.query;

        // Build Prisma query
        const where: any = {};
        
        if (category) {
          where.category = category as string;
        }
        
        if (status) {
          where.status = status as string;
        }

        if (featured) {
          where.featured = featured === 'true';
        }

        const skip = (Number(page) - 1) * Number(limit);

        // Using Prisma instead of Mongoose
        const [products, total] = await Promise.all([
          prisma.product.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            skip,
            take: Number(limit),
          }),
          prisma.product.count({ where })
        ]);

        res.status(200).json({
          products,
          pagination: {
            total,
            pages: Math.ceil(total / Number(limit)),
            current: Number(page),
          },
        });
      } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
      }
      break;

    case 'POST':
      try {
        const session = await getServerSession(req, res, authOptions);
        if (!session) {
          return res.status(401).json({ error: 'Unauthorized' });
        }

        // Using Prisma instead of Mongoose
        const product = await prisma.product.create({
          data: req.body,
        });
        
        res.status(201).json(product);
      } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ error: 'Failed to create product' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
