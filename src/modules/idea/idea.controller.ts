/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// src/modules/idea/ideaController.ts
import type { Request, Response } from 'express';
import { PrismaClient, IdeaStatus } from '@prisma/client';
import { ideaCreateSchema, ideaUpdateSchema, ideaSubmitSchema } from './idea.validation';
import { z } from 'zod';

const prisma = new PrismaClient();

// Create an Idea
export const createIdea = async (req: Request, res: Response): Promise<void> => {
    try {
        const validatedData = ideaCreateSchema.parse(req.body);

        const { title, problem, solution, description, images, categoryId, price, isPaid } = validatedData;
        const userId = req.userId;

        const newIdea = await prisma.idea.create({
            data: {
                title,
                problem,
                solution,
                description,
                images,
                categoryId,
                price,
                isPaid,
                userId: userId || '',  // Make sure to handle undefined properly
                status: IdeaStatus.DRAFT,
            },
        });

        res.status(201).json(newIdea);
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ error: error.errors });
        } else {
            res.status(500).json({ error: 'Error creating idea' });
        }
    }
};

export const updateIdea = async (req: Request, res: Response): Promise<void> => {
    try {
        const validatedData = ideaUpdateSchema.parse({ ...req.body, id: req.params.id });

        const { id, title, problem, solution, description, images, categoryId, price, isPaid } = validatedData;
        const userId = req.userId;

        const idea = await prisma.idea.findUnique({ where: { id } });
        if (!idea || idea.userId !== userId || idea.status !== IdeaStatus.DRAFT) {
            res.status(403).json({ error: 'You can only edit your own draft ideas' });
            return;
        }

        const updatedIdea = await prisma.idea.update({
            where: { id },
            data: {
                title,
                problem,
                solution,
                description,
                images,
                categoryId,
                price,
                isPaid,
            },
        });

        res.status(200).json(updatedIdea);
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ error: error.errors });
        } else {
            res.status(500).json({ error: 'Error updating idea' });
        }
    }
};

// Submit Idea for Review
export const submitIdea = async (req: Request, res: Response) => {
    try {
        const validatedData = ideaSubmitSchema.parse(req.params);

        const { id } = validatedData;
        const userId = req.userId;

        const idea = await prisma.idea.findUnique({ where: { id } });
        if (!idea || idea.userId !== userId || idea.status !== IdeaStatus.DRAFT) {
            return res.status(403).json({ error: 'You can only submit your draft ideas' });
        }

        const submittedIdea = await prisma.idea.update({
            where: { id },
            data: { status: IdeaStatus.PENDING },
        });

        return res.status(200).json(submittedIdea);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ error: error.errors });
        }
        return res.status(500).json({ error: 'Error submitting idea for review' });
    }
};

// Admin Approve Idea
export const approveIdea = async (req: Request, res: Response) => {
    const ideaId = req.params.id;

    try {
        const idea = await prisma.idea.update({
            where: { id: ideaId },
            data: { status: IdeaStatus.APPROVED },
        });

        return res.status(200).json(idea);
    } catch (error) {
        return res.status(500).json({ error: 'Error approving idea' });
    }
};

// Admin Reject Idea
export const rejectIdea = async (req: Request, res: Response) => {
    const ideaId = req.params.id;
    const { feedback } = req.body;

    try {
        const idea = await prisma.idea.update({
            where: { id: ideaId },
            data: { status: IdeaStatus.REJECTED, feedback },
        });

        return res.status(200).json(idea);
    } catch (error) {
        return res.status(500).json({ error: 'Error rejecting idea' });
    }
};
