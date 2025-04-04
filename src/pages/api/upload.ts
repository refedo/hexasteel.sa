import { NextApiRequest, NextApiResponse } from 'next';
import { IncomingForm } from 'formidable';
import { promises as fs } from 'fs';
import path from 'path';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Ensure upload directory exists
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    try {
      await fs.access(uploadDir);
    } catch {
      await fs.mkdir(uploadDir, { recursive: true });
    }

    const form = new IncomingForm({
      uploadDir,
      keepExtensions: true,
      maxFiles: 10,
      maxFileSize: 10 * 1024 * 1024, // 10MB
    });

    const { files } = await new Promise((resolve, reject) => {
      form.parse(req, (err, _, files) => {
        if (err) reject(err);
        resolve({ files });
      });
    });

    const uploadedFiles = Array.isArray(files.images) ? files.images : [files.images];
    const urls = await Promise.all(
      uploadedFiles.map(async (file) => {
        const filename = path.basename(file.filepath);
        return `/uploads/${filename}`;
      })
    );

    res.status(200).json({ urls });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Failed to upload files' });
  }
}
