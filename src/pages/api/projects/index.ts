import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
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
    switch (req.method) {
      case 'GET':
        try {
          const { featured, category, limit = 10, page = 1 } = req.query;
          const query: any = {};

          if (featured) query.featured = featured === 'true';
          if (category) query.category = category as string;

          const skip = (Number(page) - 1) * Number(limit);
          
          // Using Prisma instead of Mongoose
          const [projects, total] = await Promise.all([
            prisma.project.findMany({
              where: query,
              orderBy: { createdAt: 'desc' },
              skip,
              take: Number(limit),
              include: {
                images: true, // Include related images
              },
            }),
            prisma.project.count({ where: query })
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
          const { images, ...projectData } = req.body;
          
          // Convert completionDate string to ISO DateTime
          if (projectData.completionDate) {
            projectData.completionDate = new Date(projectData.completionDate).toISOString();
          }
          
          // Using Prisma transaction to create project and related images
          const project = await prisma.project.create({
            data: {
              ...projectData,
              scope: projectData.scope || [],
              specifications: projectData.specifications || {},
              status: projectData.status || 'Planned',
              featured: projectData.featured || false,
              // Create related images in the same transaction
              images: {
                create: images?.map((image: { url: string; caption?: string }) => ({
                  url: image.url,
                  caption: image.caption || '',
                })) || [],
              },
            },
            include: {
              images: true,
            },
          });
          
          res.status(201).json(project);

        } catch (error: any) {
          console.error('Error creating project:', error);

          if (error.code === 'P2002') {
            return res.status(400).json({
              error: 'Validation error',
              details: 'A unique constraint would be violated.'
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
