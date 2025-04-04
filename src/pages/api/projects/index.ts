import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '../../../lib/mongodb';
import Project from '../../../models/Project';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectDB();

    switch (req.method) {
      case 'GET':
        try {
          const { featured, category, limit = 10, page = 1 } = req.query;
          const query: any = {};

          if (featured) query.featured = featured === 'true';
          if (category) query.category = category;

          const skip = (Number(page) - 1) * Number(limit);
          
          const [projects, total] = await Promise.all([
            Project
              .find(query)
              .sort({ createdAt: -1 })
              .skip(skip)
              .limit(Number(limit))
              .exec(),
            Project.countDocuments(query)
          ]);

          res.status(200).json({
            projects,
            pagination: {
              total,
              pages: Math.ceil(total / Number(limit)),
              current: Number(page),
            },
          });
        } catch (error) {
          console.error('Error fetching projects:', error);
          res.status(500).json({ error: 'Failed to fetch projects' });
        }
        break;

      case 'POST':
        const session = await getServerSession(req, res, authOptions);
        if (!session) {
          return res.status(401).json({ error: 'Unauthorized' });
        }

        try {
          const projectData = {
            ...req.body,
            scope: req.body.scope || [],
            specifications: req.body.specifications || new Map(),
            status: req.body.status || 'Planned',
            featured: req.body.featured || false
          };

          const project = new Project(projectData);
          await project.save();
          
          res.status(201).json(project);

        } catch (error: any) {
          console.error('Error creating project:', error);

          if (error.name === 'ValidationError') {
            return res.status(400).json({
              error: 'Validation error',
              details: error.message
            });
          }

          res.status(500).json({
            error: 'Failed to create project',
            details: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
          });
        }
        break;

      default:
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Handler error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
