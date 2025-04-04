import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { connectDB } from '../../../lib/mongodb';
import Testimonial from '../../../models/Testimonial';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  await connectDB();

  switch (req.method) {
    case 'GET':
      try {
        const testimonial = await Testimonial
          .findById(id)
          .populate('projectReference', 'title');

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

        const testimonial = await Testimonial.findById(id);
        if (!testimonial) {
          return res.status(404).json({ error: 'Testimonial not found' });
        }

        const updatedTestimonial = await Testimonial.findByIdAndUpdate(
          id,
          { ...req.body },
          { new: true }
        ).populate('projectReference', 'title');

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

        const testimonial = await Testimonial.findById(id);
        if (!testimonial) {
          return res.status(404).json({ error: 'Testimonial not found' });
        }

        await Testimonial.findByIdAndDelete(id);
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

        const testimonial = await Testimonial.findById(id);
        if (!testimonial) {
          return res.status(404).json({ error: 'Testimonial not found' });
        }

        const updatedTestimonial = await Testimonial.findByIdAndUpdate(
          id,
          { $set: req.body },
          { new: true }
        ).populate('projectReference', 'title');

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
