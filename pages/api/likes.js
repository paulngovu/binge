import { PrismaClient } from '@prisma/client';

import { prisma } from '../../utils/lib/db';

export default async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'only get requests allowed' });
  }
  try {
    const newLike = JSON.parse(req.headers["content"]);
    
    const savedLike = await prisma.like.create({ data: newLike });
    
    res.status(200).json(savedLike);
  } catch (err) {
    res.status(400).json({ message: 'Something went wrong' });
  }
};