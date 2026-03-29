import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, phone, company, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'Required fields are missing' });
    }

    // Create new contact submission using Prisma
    const contact = await prisma.contact.create({
      data: {
        name,
        email,
        phone: phone || '',
        company: company || '',
        subject,
        message,
        status: 'new',
      },
    });

    // Here you would typically also send an email notification
    // to your team and an auto-reply to the customer

    return res.status(200).json({ success: true, contact });
  } catch (error) {
    console.error('Error handling contact form submission:', error);
    return res.status(500).json({ message: 'Failed to submit contact form' });
  }
}
