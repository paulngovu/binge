import { PrismaClient } from '@prisma/client';

import { prisma } from '../../utils/lib/db';

export default async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'only get requests allowed' });
  }
 
  try {
    const recipe = JSON.parse(req.headers["content"]);
    const savedRecipe = await prisma.recipe.create({ data: recipe });
    console.log(savedRecipe);
    res.status(200).json(savedRecipe);
  } catch (err) {
    res.status(400).json({ message: 'Something went wrong' });
  }
};