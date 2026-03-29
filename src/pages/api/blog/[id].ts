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
    return res.status(400).json({ error: 'Invalid blog post ID' });
  }

  switch (req.method) {
    case 'GET':
      try {
        // Using Prisma instead of Mongoose
        const post = await prisma.blog.findUnique({
          where: { id },
          include: {
            author: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        });

        if (!post) {
          return res.status(404).json({ error: 'Blog post not found' });
        }

        // No view count in schema, so we'll skip this step

        res.status(200).json(post);
      } catch (error) {
        console.error('Error fetching blog post:', error);
        res.status(500).json({ error: 'Failed to fetch blog post' });
      }
      break;

    case 'PUT':
      try {
        const session = await getServerSession(req, res, authOptions);
        if (!session) {
          return res.status(401).json({ error: 'Unauthorized' });
        }

        // Using Prisma instead of Mongoose
        const post = await prisma.blog.findUnique({
          where: { id },
          include: { author: true },
        });

        if (!post) {
          return res.status(404).json({ error: 'Blog post not found' });
        }

        // Check if user is author or admin
        if (post.authorId !== session.user.id && session.user.role !== 'admin') {
          return res.status(403).json({ error: 'Forbidden' });
        }

        // Using Prisma instead of Mongoose
        const updatedPost = await prisma.blog.update({
          where: { id },
          data: req.body,
          include: {
            author: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        });

        res.status(200).json(updatedPost);
      } catch (error) {
        console.error('Error updating blog post:', error);
        res.status(500).json({ error: 'Failed to update blog post' });
      }
      break;

    case 'DELETE':
      try {
        const session = await getServerSession(req, res, authOptions);
        if (!session) {
          return res.status(401).json({ error: 'Unauthorized' });
        }

        // Using Prisma instead of Mongoose
        const post = await prisma.blog.findUnique({
          where: { id },
          include: { author: true },
        });

        if (!post) {
          return res.status(404).json({ error: 'Blog post not found' });
        }

        // Check if user is author or admin
        if (post.authorId !== session.user.id && session.user.role !== 'admin') {
          return res.status(403).json({ error: 'Forbidden' });
        }

        // Using Prisma instead of Mongoose
        await prisma.blog.delete({ where: { id } });
        res.status(204).end();
      } catch (error) {
        console.error('Error deleting blog post:', error);
        res.status(500).json({ error: 'Failed to delete blog post' });
      }
      break;

    case 'PATCH':
      try {
        const session = await getServerSession(req, res, authOptions);
        if (!session) {
          return res.status(401).json({ error: 'Unauthorized' });
        }

        // Using Prisma instead of Mongoose
        const post = await prisma.blog.findUnique({
          where: { id },
          include: { author: true },
        });

        if (!post) {
          return res.status(404).json({ error: 'Blog post not found' });
        }

        // Check if user is author or admin
        if (post.authorId !== session.user.id && session.user.role !== 'admin') {
          return res.status(403).json({ error: 'Forbidden' });
        }

        // Prepare update data
        const updateData = { ...req.body };
        
        // No status field in schema, so we'll skip this step

        // Using Prisma instead of Mongoose
        const updatedPost = await prisma.blog.update({
          where: { id },
          data: updateData,
          include: {
            author: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        });

        res.status(200).json(updatedPost);
      } catch (error) {
        console.error('Error updating blog post:', error);
        res.status(500).json({ error: 'Failed to update blog post' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE', 'PATCH']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
