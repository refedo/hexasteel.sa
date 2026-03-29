import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '2mb',
    },
  },
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    

    const { id } = req.query;
    const { image } = req.body;

    if (!image || !image.url) {
      return res.status(400).json({
        error: 'Invalid request',
        details: 'Image URL is required'
      });
    }

    const project = await prisma.project.findUnique({
      where: { id: id as string },
      include: { images: true }
    });
    
    if (!project) {
      return res.status(404).json({
        error: 'Project not found'
      });
    }

    // Check image count limit
    if (project.images.length >= 20) {
      return res.status(400).json({
        error: 'Too many images',
        details: 'A project cannot have more than 20 images'
      });
    }

    // Add the new image
    await prisma.image.create({
      data: {
        url: image.url,
        caption: image.caption || '',
        projectId: id as string
      }
    });

    res.status(200).json({
      message: 'Image added successfully',
      imageCount: project.images.length + 1
    });

  } catch (error: any) {
    console.error('Error adding image:', error);

    if (error.message.includes('timed out')) {
      return res.status(500).json({
        error: 'Operation timed out',
        details: 'Please try again with a smaller image size'
      });
    }

    res.status(500).json({
      error: 'Failed to add image',
      details: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
}
