import { prisma } from '../../utils/prismaClient';

export const createComment = async (userId: string, ideaId: string, content: string) => {
  return prisma.comment.create({
    data: {
      content,
      userId,
      ideaId,
    },
  });
};

export const getCommentsByIdeaId = async (ideaId: string) => {
  return prisma.comment.findMany({
    where: { ideaId },
    include: {
      user: true, // optional: include user info
    },
  });
};

export const deleteComment = async (commentId: string, userId: string) => {
  return prisma.comment.deleteMany({
    where: {
      id: commentId,
      userId,
    },
  });
};
