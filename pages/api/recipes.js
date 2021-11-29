import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'only get requests allowed' });
  }
 
  try {
    const message = JSON.parse(req.headers["content"]);
    const savedMessage = await prisma.recipe.create({ data: message });
    console.log(savedMessage);
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(400).json({ message: 'Something went wrong' });
  }
};