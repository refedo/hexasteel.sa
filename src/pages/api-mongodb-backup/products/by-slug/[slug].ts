import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '../../../../lib/mongodb';
import Product from '../../../../models/Product';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { slug } = req.query;
  await connectDB();

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const product = await Product.findOne({ slug });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
}
