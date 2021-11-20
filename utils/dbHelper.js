import prisma from '../lib/prisma';

export const getChatHistory = async (username, foodId) => {
    const chat = await prisma.messages.findUnique({
        where: {
            AND: [
                { username: {equals: username }},
                { foodId: { equals: foodId }},
            ]
        }
    });

    return chat;
};

export const getLikedFoods = async (username) => {
    const likedFoods = await prisma.likes.findMany({
        where: {
            username: {
                equals: username
            }
          }
      })


    return likedFoods;
}