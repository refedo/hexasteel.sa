import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import prisma from '../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  
  // Ensure id is a string
  if (!id || Array.isArray(id)) {
    return res.status(400).json({ error: 'Invalid product ID' });
  }

  switch (req.method) {
    case 'GET':
      try {
        // Using Prisma instead of Mongoose
        const product = await prisma.product.findUnique({
          where: { id },
        });
        
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

        // Using Prisma instead of Mongoose
        const product = await prisma.product.findUnique({
          where: { id },
        });
        
        if (!product) {
          return res.status(404).json({ error: 'Product not found' });
        }

        // Using Prisma instead of Mongoose
        const updatedProduct = await prisma.product.update({
          where: { id },
          data: req.body,
        });

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

        // Using Prisma instead of Mongoose
        const product = await prisma.product.findUnique({
          where: { id },
        });
        
        if (!product) {
          return res.status(404).json({ error: 'Product not found' });
        }

        // Using Prisma instead of Mongoose
        await prisma.product.delete({
          where: { id },
        });
        
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

        // Using Prisma instead of Mongoose
        const product = await prisma.product.findUnique({
          where: { id },
        });
        
        if (!product) {
          return res.status(404).json({ error: 'Product not found' });
        }

        // Using Prisma instead of Mongoose
        const updatedProduct = await prisma.product.update({
          where: { id },
          data: req.body,
        });

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
