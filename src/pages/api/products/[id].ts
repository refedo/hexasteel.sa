import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { connectDB } from '../../../lib/mongodb';
import Product from '../../../models/Product';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  await connectDB();

  switch (req.method) {
    case 'GET':
      try {
        const product = await Product.findById(id);
        if (!product) {
          return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json(product);
      } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ error: 'Failed to fetch product' });
      }
      break;

    case 'PUT':
      try {
        const session = await getServerSession(req, res, authOptions);
        if (!session) {
          return res.status(401).json({ error: 'Unauthorized' });
        }

        const product = await Product.findById(id);
        if (!product) {
          return res.status(404).json({ error: 'Product not found' });
        }

        const updatedProduct = await Product.findByIdAndUpdate(
          id,
          { ...req.body },
          { new: true }
        );

        res.status(200).json(updatedProduct);
      } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Failed to update product' });
      }
      break;

    case 'DELETE':
      try {
        const session = await getServerSession(req, res, authOptions);
        if (!session) {
          return res.status(401).json({ error: 'Unauthorized' });
        }

        const product = await Product.findById(id);
        if (!product) {
          return res.status(404).json({ error: 'Product not found' });
        }

        await Product.findByIdAndDelete(id);
        res.status(204).end();
      } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'Failed to delete product' });
      }
      break;

    case 'PATCH':
      try {
        const session = await getServerSession(req, res, authOptions);
        if (!session) {
          return res.status(401).json({ error: 'Unauthorized' });
        }

        const product = await Product.findById(id);
        if (!product) {
          return res.status(404).json({ error: 'Product not found' });
        }

        const updatedProduct = await Product.findByIdAndUpdate(
          id,
          { $set: req.body },
          { new: true }
        );

        res.status(200).json(updatedProduct);
      } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Failed to update product' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE', 'PATCH']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
