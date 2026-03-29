import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { connectDB } from '../../../lib/mongodb';
import Testimonial from '../../../models/Testimonial';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();

  switch (req.method) {
    case 'GET':
      try {
        const { 
          status = 'all',
          featured,
          limit = 10,
          page = 1,
        } = req.query;

        const query: any = {};
        
        if (status !== 'all') {
          query.status = status;
        }
        
        if (featured) {
          query.featured = featured === 'true';
        }

        const skip = (Number(page) - 1) * Number(limit);

        const testimonials = await Testimonial
          .find(query)
          .populate('projectReference', 'title')
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(Number(limit));

        const total = await Testimonial.countDocuments(query);

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

        const testimonial = await Testimonial.create(req.body);
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
