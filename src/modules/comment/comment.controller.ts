/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Request, Response } from 'express';
import {
  createComment as createCommentService,
  getCommentsByIdeaId as getCommentsByIdeaIdService,
  deleteComment as deleteCommentService,
} from './comment.service';

export const createComment = async (req: Request, res: Response): Promise<void> => {
  const { ideaId, content } = req.body;
  const userId = req.userId;

  try {
    const newComment = await createCommentService(userId!, ideaId, content);
    res.status(201).json(newComment);
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Error creating comment' });
  }
};

export const getCommentsByIdeaId = async (req: Request, res: Response): Promise<void> => {
  const ideaId = req.params.ideaId;

  try {
    const comments = await getCommentsByIdeaIdService(ideaId);
    res.status(200).json(comments);
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Error fetching comments' });
  }
};

export const deleteComment = async (req: Request, res: Response): Promise<void> => {
  const commentId = req.params.commentId;
  const userId = req.userId;

  try {
    await deleteCommentService(commentId, userId!);
    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Error deleting comment' });
  }
};
