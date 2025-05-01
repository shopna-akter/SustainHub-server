/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import type { Request, Response } from 'express';
import { prisma } from '../../utils/prismaClient';
import { createCategorySchema, updateCategorySchema } from './category.validation';

export const createCategory = async (req: Request, res: Response): Promise<void> => {
  const parsed = createCategorySchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.format() });
    return;
  }

  const { name } = parsed.data;

  try {
    const category = await prisma.category.create({ data: { name } });
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create category' });
  }
};

export const getAllCategories = async (_req: Request, res: Response): Promise<void> => {
  try {
    const categories = await prisma.category.findMany();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
};

export const getCategoryById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const category = await prisma.category.findUnique({ where: { id } });
    if (!category) {
      res.status(404).json({ error: 'Category not found' });
      return;
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch category' });
  }
};

export const updateCategory = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const parsed = updateCategorySchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.format() });
    return;
  }

  try {
    const updated = await prisma.category.update({
      where: { id },
      data: parsed.data,
    });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update category' });
  }
};

export const deleteCategory = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    await prisma.category.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete category' });
  }
};
