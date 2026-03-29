import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { connectDB } from '../../../lib/mongodb';
import Product from '../../../models/Product';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();

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

        const query: any = {};
        
        if (category) {
          query.category = category;
        }
        
        if (status) {
          query.status = status;
        }

        if (featured) {
          query.featured = featured === 'true';
        }

        const skip = (Number(page) - 1) * Number(limit);

        const products = await Product
          .find(query)
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(Number(limit));

        const total = await Product.countDocuments(query);

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

        const product = await Product.create(req.body);
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
