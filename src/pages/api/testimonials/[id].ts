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
    return res.status(400).json({ error: 'Invalid testimonial ID' });
  }

  switch (req.method) {
    case 'GET':
      try {
        // Using Prisma instead of Mongoose
        const testimonial = await prisma.testimonial.findUnique({
          where: { id },
          include: {
            projectReference: {
              select: {
                id: true,
                title: true,
              },
            },
          },
        });

        if (!testimonial) {
          return res.status(404).json({ error: 'Testimonial not found' });
        }

        res.status(200).json(testimonial);
      } catch (error) {
        console.error('Error fetching testimonial:', error);
        res.status(500).json({ error: 'Failed to fetch testimonial' });
      }
      break;

    case 'PUT':
      try {
        const session = await getServerSession(req, res, authOptions);
        if (!session) {
          return res.status(401).json({ error: 'Unauthorized' });
        }

        // Using Prisma instead of Mongoose
        const testimonial = await prisma.testimonial.findUnique({
          where: { id },
        });
        
        if (!testimonial) {
          return res.status(404).json({ error: 'Testimonial not found' });
        }

        // Extract projectReference to handle separately
        const { projectReference, ...testimonialData } = req.body;
        
        // Using Prisma instead of Mongoose
        const updatedTestimonial = await prisma.testimonial.update({
          where: { id },
          data: {
            ...testimonialData,
            ...(projectReference && {
              projectReference: {
                connect: { id: projectReference },
              },
            }),
          },
          include: {
            projectReference: {
              select: {
                id: true,
                title: true,
              },
            },
          },
        });

        res.status(200).json(updatedTestimonial);
      } catch (error) {
        console.error('Error updating testimonial:', error);
        res.status(500).json({ error: 'Failed to update testimonial' });
      }
      break;

    case 'DELETE':
      try {
        const session = await getServerSession(req, res, authOptions);
        if (!session) {
          return res.status(401).json({ error: 'Unauthorized' });
        }

        // Using Prisma instead of Mongoose
        const testimonial = await prisma.testimonial.findUnique({
          where: { id },
        });
        
        if (!testimonial) {
          return res.status(404).json({ error: 'Testimonial not found' });
        }

        // Using Prisma instead of Mongoose
        await prisma.testimonial.delete({
          where: { id },
        });
        
        res.status(204).end();
      } catch (error) {
        console.error('Error deleting testimonial:', error);
        res.status(500).json({ error: 'Failed to delete testimonial' });
      }
      break;

    case 'PATCH':
      try {
        const session = await getServerSession(req, res, authOptions);
        if (!session) {
          return res.status(401).json({ error: 'Unauthorized' });
        }

        // Using Prisma instead of Mongoose
        const testimonial = await prisma.testimonial.findUnique({
          where: { id },
        });
        
        if (!testimonial) {
          return res.status(404).json({ error: 'Testimonial not found' });
        }

        // Extract projectReference to handle separately
        const { projectReference, ...testimonialData } = req.body;
        
        // Using Prisma instead of Mongoose
        const updatedTestimonial = await prisma.testimonial.update({
          where: { id },
          data: {
            ...testimonialData,
            ...(projectReference && {
              projectReference: {
                connect: { id: projectReference },
              },
            }),
          },
          include: {
            projectReference: {
              select: {
                id: true,
                title: true,
              },
            },
          },
        });

        res.status(200).json(updatedTestimonial);
      } catch (error) {
        console.error('Error updating testimonial:', error);
        res.status(500).json({ error: 'Failed to update testimonial' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE', 'PATCH']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
