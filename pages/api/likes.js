import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'only get requests allowed' });
  }
  console.log("get request body entered");
  try {
    const newLike = JSON.parse(req.headers["content"]);
    console.log("new like:")
    console.log(newLike)
    
    const savedLike = await prisma.like.create({ data: newLike });
    
    console.log(savedLike);
    res.status(200).json(savedLike);
  } catch (err) {
    res.status(401).json({ message: 'Something went wrong' });
  }
};