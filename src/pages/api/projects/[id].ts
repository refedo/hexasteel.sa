import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '../../../lib/mongodb';
import Project from '../../../models/Project';
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

  await connectDB();

  switch (req.method) {
    case 'GET':
      try {
        const project = await Project.findById(id);
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
          const updatedProject = await Project.findByIdAndUpdate(
            id,
            { ...req.body },
            { new: true, runValidators: true }
          );

          if (!updatedProject) {
            return res.status(404).json({ error: 'Project not found' });
          }

          console.log('Project updated:', updatedProject);
          res.status(200).json(updatedProject);
        } catch (validationError: any) {
          console.error('Validation error:', {
            error: validationError,
            errors: validationError.errors,
            message: validationError.message,
            name: validationError.name
          });
          
          if (validationError.name === 'ValidationError') {
            return res.status(400).json({
              error: 'Validation error',
              details: validationError.message,
              fields: Object.keys(validationError.errors).reduce((acc: any, key: string) => {
                acc[key] = validationError.errors[key].message;
                return acc;
              }, {})
            });
          }
          throw validationError;
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

        const deletedProject = await Project.findByIdAndDelete(id);
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
