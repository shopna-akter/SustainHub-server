/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import type { Request, Response } from 'express';
import { prisma } from '../../utils/prismaClient';
import { User } from '@prisma/client';

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true, role: true, isActive: true, createdAt: true }
    });
    res.status(200).json(users);
  } catch {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

export const toggleUserStatus = async (req: Request, res: Response): Promise<void> => {
  const userId = req.params.id;

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const updated = await prisma.user.update({
      where: { id: userId },
      data: { isActive: !user.isActive }
    });

    res.status(200).json(updated);
  } catch {
    res.status(500).json({ error: 'Failed to update user status' });
  }
};

export const getAllIdeas = async (req: Request, res: Response): Promise<void> => {
  try {
    const ideas = await prisma.idea.findMany({
      include: {
        user: { select: { id: true, name: true, email: true } },
        category: true
      }
    });
    res.status(200).json(ideas);
  } catch {
    res.status(500).json({ error: 'Failed to fetch ideas' });
  }
};
