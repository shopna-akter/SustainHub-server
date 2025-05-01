import type { Request, Response } from 'express';
import {
  findExistingVote,
  updateVote,
  createVote,
  getVotesByIdeaId,
} from './vote.service';

export const castVote = async (req: Request, res: Response): Promise<void> => {
  const userId = req.userId;
  const { ideaId, type } = req.body;

  if (!userId || !ideaId || !type) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }

  const existingVote = await findExistingVote(userId, ideaId);

  let vote;
  if (existingVote) {
    vote = await updateVote(existingVote.id, type);
  } else {
    vote = await createVote(userId, ideaId, type);
  }

  res.status(200).json(vote);
};

export const getVotesForIdea = async (req: Request, res: Response): Promise<void> => {
  const ideaId = req.params.ideaId;

  if (!ideaId) {
    res.status(400).json({ error: 'Idea ID is required' });
    return;
  }

  const votes = await getVotesByIdeaId(ideaId);
  res.status(200).json(votes);
};
