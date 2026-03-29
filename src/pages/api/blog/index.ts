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
          page = 1, 
          limit = 10, 
          category,
          tag,
          status,
          search 
        } = req.query;

        // Build Prisma query
        const where: any = {};
        
        if (category) where.category = category as string;
        if (status) where.status = status as string;
        
        // Handle tag filtering
        if (tag) {
          where.tags = {
            has: tag as string
          };
        }
        
        // Handle search
        if (search) {
          where.OR = [
            { title: { contains: search as string, mode: 'insensitive' } },
            { content: { contains: search as string, mode: 'insensitive' } },
          ];
        }

        const skip = (Number(page) - 1) * Number(limit);

        // Using Prisma instead of Mongoose
        const [posts, total] = await Promise.all([
          prisma.blog.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            skip,
            take: Number(limit),
            include: {
              author: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          }),
          prisma.blog.count({ where })
        ]);

        res.status(200).json({
          posts,
          pagination: {
            total,
            pages: Math.ceil(total / Number(limit)),
            current: Number(page),
          },
        });
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        res.status(500).json({ error: 'Failed to fetch blog posts' });
      }
      break;

    case 'POST':
      try {
        const session = await getServerSession(req, res, authOptions);
        if (!session) {
          return res.status(401).json({ error: 'Unauthorized' });
        }

        // Using Prisma instead of Mongoose
        const post = await prisma.blog.create({
          data: {
            ...req.body,
            author: {
              connect: { id: session.user.id as string }
            },
          },
        });

        res.status(201).json(post);
      } catch (error) {
        console.error('Error creating blog post:', error);
        res.status(500).json({ error: 'Failed to create blog post' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
