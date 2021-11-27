import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllUsers = async () => {
  const users = await prisma.user.findMany();
  return users;
};

export const getUser = async (username) => {
  const user = await prisma.user.findUnique({
    where: { username: { equals: username } },
  });

  return user;
};

export const createUser = async (username, password) => {
  const createdUser = await prisma.user.create({
    data: {
      username: username,
      password: password,
      filterQuery: '',
      mealType: [],
      cusineType: [],
      dishType: [],
    },
  });
  return createdUser;
};
