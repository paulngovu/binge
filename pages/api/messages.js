import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const message = JSON.parse(req.body);
    const savedMessage = await prisma.message.create({ data: message });
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(400).json({ message: 'Something went wrong' });
  }
};