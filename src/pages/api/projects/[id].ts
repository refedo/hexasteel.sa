import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  
  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid project ID' });
  }

  switch (req.method) {
    case 'GET':
      try {
        // Using Prisma instead of Mongoose
        const project = await prisma.project.findUnique({
          where: { id },
          include: {
            images: true,
          },
        });
        
        if (!project) {
          return res.status(404).json({ error: 'Project not found' });
        }
        
        res.status(200).json(project);
      } catch (error) {
        console.error('Error fetching project:', error);
        res.status(500).json({ error: 'Failed to fetch project' });
      }
      break;

    case 'PUT':
      try {
        const session = await getServerSession(req, res, authOptions);
        if (!session) {
          return res.status(401).json({ error: 'Unauthorized' });
        }

        console.log('Updating project with data:', JSON.stringify(req.body, null, 2));

        try {
          // Extract images from request body to handle separately
          const { images, ...projectData } = req.body;
          
          // Convert completionDate string to ISO DateTime
          if (projectData.completionDate) {
            projectData.completionDate = new Date(projectData.completionDate).toISOString();
          }
          
          // Using Prisma instead of Mongoose
          const updatedProject = await prisma.project.update({
            where: { id },
            data: projectData,
            include: {
              images: true,
            },
          });

          // Handle images update if provided
          if (images && Array.isArray(images)) {
            // Delete existing images
            await prisma.image.deleteMany({
              where: { projectId: id },
            });
            
            // Create new images
            if (images.length > 0) {
              await prisma.image.createMany({
                data: images.map((image: any) => ({
                  url: image.url,
                  caption: image.caption || '',
                  projectId: id,
                })),
              });
            }
            
            // Fetch the project again with updated images
            const projectWithImages = await prisma.project.findUnique({
              where: { id },
              include: {
                images: true,
              },
            });
            
            if (projectWithImages) {
              return res.status(200).json(projectWithImages);
            }
          }

          console.log('Project updated:', updatedProject);
          res.status(200).json(updatedProject);
        } catch (validationError: any) {
          console.error('Validation error:', {
            error: validationError,
            message: validationError.message,
          });
          
          return res.status(400).json({
            error: 'Validation error',
            details: validationError.message,
          });
        }
      } catch (error) {
        console.error('Error updating project:', error);
        res.status(500).json({ 
          error: 'Failed to update project',
          details: error instanceof Error ? error.message : 'Unknown error'
        });
      }
      break;

    case 'DELETE':
      try {
        const session = await getServerSession(req, res, authOptions);
        if (!session) {
          return res.status(401).json({ error: 'Unauthorized' });
        }

        // Using Prisma instead of Mongoose
        // First delete related images
        await prisma.image.deleteMany({
          where: { projectId: id },
        });
        
        // Then delete the project
        const deletedProject = await prisma.project.delete({
          where: { id },
        });
        
        if (!deletedProject) {
          return res.status(404).json({ error: 'Project not found' });
        }
        
        res.status(200).json({ message: 'Project deleted successfully' });
      } catch (error) {
        console.error('Error deleting project:', error);
        res.status(500).json({ error: 'Failed to delete project' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
