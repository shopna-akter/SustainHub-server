import { z } from 'zod';

export const ideaCreateSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  problem: z.string().min(1, 'Problem is required'),
  solution: z.string().min(1, 'Solution is required'),
  description: z.string().min(1, 'Description is required'),
  images: z.array(z.string()).min(1, 'At least one image is required'),
  categoryId: z.string().min(1, 'Category is required'),
  price: z.number().optional(),
  isPaid: z.boolean().default(false),
});

export const ideaUpdateSchema = ideaCreateSchema.extend({
  id: z.string().min(1, 'Idea ID is required'),
});

export const ideaSubmitSchema = z.object({
  id: z.string().min(1, 'Idea ID is required'),
});