import { z } from 'zod';

export const commentSchema = z.object({
  body: z.object({
    ideaId: z.string().uuid(),
    content: z.string().min(1, 'Content is required'),
  }),
});
