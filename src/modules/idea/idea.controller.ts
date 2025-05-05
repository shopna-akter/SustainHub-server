/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Request, Response } from 'express';
import { PrismaClient, IdeaStatus } from '@prisma/client';
import { ideaCreateSchema, ideaUpdateSchema, ideaSubmitSchema } from './idea.validation';
import { z } from 'zod';

const prisma = new PrismaClient();

interface ApproveRejectIdeaParams {
    id: string;
}

interface RejectIdeaBody {
    feedback: string;
}
export const createIdea = async (req: Request, res: Response): Promise<void> => {
    try {
        const validated = ideaCreateSchema.omit({ images: true }).parse(req.body);

        const imageUrls = (req.files as Express.Multer.File[]).map((file) => file.path);

        const { title, problem, solution, description, categoryId, price, isPaid } = validated;
        const userId = req.userId;

        const newIdea = await prisma.idea.create({
            data: {
                title,
                problem,
                solution,
                description,
                categoryId,
                price,
                isPaid,
                images: imageUrls,
                userId: userId ?? '',
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

export const submitIdea = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const userId = req.userId;

        if (!userId) {
            res.status(400).json({ error: 'User not authenticated' });
            return;
        }

        const idea = await prisma.idea.findUnique({ where: { id } });

        if (!idea) {
            res.status(404).json({ error: 'Idea not found' });
            return;
        }

        if (idea.userId !== userId) {
            res.status(403).json({ error: 'You can only submit your own ideas' });
            return;
        }

        // Validate the idea before submission
        await ideaSubmitSchema.parseAsync(idea);

        const updatedIdea = await prisma.idea.update({
            where: { id },
            data: { status: IdeaStatus.PENDING },
        });

        res.status(200).json(updatedIdea);
    } catch (error) {
        res.status(500).json({ error: 'Error submitting idea' });
    }
};

export const approveIdea = async (
    req: Request<{ id: string }>,
    res: Response
): Promise<void> => {
    const { id } = req.params;

    try {
        const idea = await prisma.idea.update({
            where: { id },
            data: { status: IdeaStatus.APPROVED },
        });

        res.status(200).json(idea);
    } catch (error) {
        res.status(500).json({ error: 'Error approving idea' });
    }
};

export const rejectIdea = async (
    req: Request<{ id: string }, {}, { feedback: string }>,
    res: Response
): Promise<void> => {
    const { id } = req.params;
    const { feedback } = req.body;

    try {
        const idea = await prisma.idea.update({
            where: { id },
            data: { status: IdeaStatus.REJECTED, feedback },
        });

        res.status(200).json(idea);
    } catch (error) {
        res.status(500).json({ error: 'Error rejecting idea' });
    }
};
