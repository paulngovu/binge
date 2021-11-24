import prisma from '../lib/prisma';

export const getChatHistory = async (username, foodId) => {
  const chat = await prisma.messages.findUnique({
    where: {
      AND: [{ username: { equals: username } }, { foodId: { equals: foodId } }],
    },
  });

  return chat;
};

export const getLikedFoods = async (username) => {
  const likedFoods = await prisma.likes.findMany({
    where: {
      username: {
        equals: username,
      },
    },
  });

  return likedFoods;
};

export const getUser = async (username, password) => {
  const user = await prisma.user.findUnique({
    where: {
      AND: [
        { username: { equals: username } },
        { password: { equals: password } },
      ],
    },
  });

  return user;
};

/**
 * Creates a user in the database.
 */
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
