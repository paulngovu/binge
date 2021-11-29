import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllUsers = async () => {
  const users = await prisma.user.findMany();
  return users;
};

export const getUser = async (username) => {
  const user = await prisma.user.findUnique({
    where: { username: username },
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

export const updateUserBio = async (username, bio) => {
  const updatedUser = await prisma.user.update({
    where: { username: username },
    data: { bio: bio },
  });
  return updatedUser;
};

export const updateUserFilter = async (username, filterQuery, mealType, cuisineType, dishType) => {
  const updatedUser = await prisma.user.update({
    where: { username: username },
    data: { filterQuery, mealType, cusineType: cuisineType, dishType },
  });
  return updatedUser;
};
