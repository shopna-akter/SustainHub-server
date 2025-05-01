import { Router } from 'express';
import { castVote, getVotesForIdea } from './vote.controller';
import { validate } from '../../middlewares/validate';
import { voteSchema } from './vote.validation';
import { verifyToken } from '../../middlewares/authMiddleware';

const router = Router();

router.post('/', verifyToken, validate(voteSchema), castVote);
router.get('/:ideaId', getVotesForIdea);

export default router;
