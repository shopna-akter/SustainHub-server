import { z } from 'zod';

export const voteSchema = z.object({
  body: z.object({
    type: z.enum(['UP', 'DOWN']),
    ideaId: z.string().uuid(),
  }),
});
