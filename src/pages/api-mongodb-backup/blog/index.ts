import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { connectDB } from '../../../lib/mongodb';
import Blog from '../../../models/Blog';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();

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

        const query: any = {};
        
        if (category) query.category = category;
        if (tag) query.tags = tag;
        if (status) query.status = status;
        if (search) {
          query.$or = [
            { title: { $regex: search, $options: 'i' } },
            { content: { $regex: search, $options: 'i' } },
          ];
        }

        const skip = (Number(page) - 1) * Number(limit);

        const posts = await Blog
          .find(query)
          .populate('author', 'name')
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(Number(limit));

        const total = await Blog.countDocuments(query);

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

        const post = await Blog.create({
          ...req.body,
          author: session.user.id,
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
