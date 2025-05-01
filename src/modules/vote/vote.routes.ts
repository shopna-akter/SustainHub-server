import { Router } from 'express';
import { castVote, getVotesForIdea } from './vote.controller';
import validateRequest from '../../middlewares/validateRequest';
import { voteSchema } from './vote.validation';
import { verifyToken } from '../../middlewares/authMiddleware';

const router = Router();

router.post('/', verifyToken, validateRequest(voteSchema), castVote);
router.get('/:ideaId', getVotesForIdea);

export default router;
