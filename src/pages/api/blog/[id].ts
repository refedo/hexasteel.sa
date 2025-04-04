import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { connectDB } from '../../../lib/mongodb';
import Blog from '../../../models/Blog';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  await connectDB();

  switch (req.method) {
    case 'GET':
      try {
        const post = await Blog
          .findById(id)
          .populate('author', 'name');

        if (!post) {
          return res.status(404).json({ error: 'Blog post not found' });
        }

        // Increment view count
        if (!req.headers['x-preview']) {
          await Blog.findByIdAndUpdate(id, { $inc: { views: 1 } });
        }

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

        const post = await Blog.findById(id);
        if (!post) {
          return res.status(404).json({ error: 'Blog post not found' });
        }

        // Check if user is author or admin
        if (post.author.toString() !== session.user.id && session.user.role !== 'admin') {
          return res.status(403).json({ error: 'Forbidden' });
        }

        const updatedPost = await Blog.findByIdAndUpdate(
          id,
          { ...req.body },
          { new: true }
        ).populate('author', 'name');

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

        const post = await Blog.findById(id);
        if (!post) {
          return res.status(404).json({ error: 'Blog post not found' });
        }

        // Check if user is author or admin
        if (post.author.toString() !== session.user.id && session.user.role !== 'admin') {
          return res.status(403).json({ error: 'Forbidden' });
        }

        await Blog.findByIdAndDelete(id);
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

        const post = await Blog.findById(id);
        if (!post) {
          return res.status(404).json({ error: 'Blog post not found' });
        }

        // Check if user is author or admin
        if (post.author.toString() !== session.user.id && session.user.role !== 'admin') {
          return res.status(403).json({ error: 'Forbidden' });
        }

        // Handle specific patch operations
        if (req.body.status === 'published' && post.status === 'draft') {
          req.body.publishedAt = new Date();
        }

        const updatedPost = await Blog.findByIdAndUpdate(
          id,
          { $set: req.body },
          { new: true }
        ).populate('author', 'name');

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
