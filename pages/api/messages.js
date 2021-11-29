import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'post request went through' });
  }
 
  try {
    const message = JSON.parse(req.headers["content"]);
    const savedMessage = await prisma.message.create({ data: message });
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(400).json({ message: 'Something went wrong' });
  }
};
