import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]';
import mongoose from 'mongoose';

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

    const project = await Project.findById(id);
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
    project.images.push({
      url: image.url,
      caption: image.caption || ''
    });

    // Save with timeout
    await Promise.race([
      project.save(),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Save operation timed out')), 10000)
      )
    ]);

    res.status(200).json({
      message: 'Image added successfully',
      imageCount: project.images.length
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
