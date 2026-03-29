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
          featured,
          limit = 10,
          page = 1,
        } = req.query;

        // Build Prisma query
        const where: any = {};
        
        if (featured) {
          where.featured = featured === 'true';
        }

        const skip = (Number(page) - 1) * Number(limit);

        // Using Prisma instead of Mongoose
        const [testimonials, total] = await Promise.all([
          prisma.testimonial.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            skip,
            take: Number(limit),
            include: {
              projectReference: true,
            },
          }),
          prisma.testimonial.count({ where })
        ]);

        res.status(200).json({
          testimonials,
          pagination: {
            total,
            pages: Math.ceil(total / Number(limit)),
            current: Number(page),
          },
        });
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        res.status(500).json({ error: 'Failed to fetch testimonials' });
      }
      break;

    case 'POST':
      try {
        const session = await getServerSession(req, res, authOptions);
        if (!session) {
          return res.status(401).json({ error: 'Unauthorized' });
        }

        // Using Prisma instead of Mongoose
        const testimonial = await prisma.testimonial.create({
          data: {
            ...req.body,
            // If projectReference is provided as an ID, connect it
            ...(req.body.projectReference && {
              projectReference: {
                connect: { id: req.body.projectReference }
              }
            })
          },
        });
        
        res.status(201).json(testimonial);
      } catch (error) {
        console.error('Error creating testimonial:', error);
        res.status(500).json({ error: 'Failed to create testimonial' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
