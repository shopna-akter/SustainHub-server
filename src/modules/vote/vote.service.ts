import { prisma } from '../../utils/prismaClient';
import type { VoteType } from '@prisma/client';

export const findExistingVote = async (userId: string, ideaId: string) => {
  return prisma.vote.findFirst({
    where: { userId, ideaId },
  });
};

export const updateVote = async (voteId: string, type: VoteType) => {
  return prisma.vote.update({
    where: { id: voteId },
    data: { type },
  });
};

export const createVote = async (userId: string, ideaId: string, type: VoteType) => {
  return prisma.vote.create({
    data: {
      ideaId,
      userId,
      type,
    },
  });
};

export const getVotesByIdeaId = async (ideaId: string) => {
  return prisma.vote.findMany({
    where: { ideaId },
  });
};
