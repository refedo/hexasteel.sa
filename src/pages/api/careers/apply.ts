import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { db } = await connectToDatabase();
    
    const application = {
      ...req.body,
      resumePath: '', // Will be updated when file storage is implemented
      status: 'new',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await db.collection('jobApplications').insertOne(application);

    // Send notification email to HR (implement with your email service)
    // await sendNotificationEmail(application);

    res.status(201).json({ 
      success: true, 
      message: 'Application submitted successfully',
      applicationId: result.insertedId 
    });
  } catch (error) {
    console.error('Error submitting application:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error submitting application. Please try again later.' 
    });
  }
}
