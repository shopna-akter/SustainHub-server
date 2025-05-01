import { Router } from 'express';
import { createComment, getCommentsByIdeaId, deleteComment } from './comment.controller';
import validateRequest from '../../middlewares/validateRequest';
import { commentSchema } from './comment.validation';
import { verifyToken } from '../../middlewares/authMiddleware';

const router = Router();

router.post('/', verifyToken, validateRequest(commentSchema), createComment);
router.get('/:ideaId', getCommentsByIdeaId);
router.delete('/:commentId', verifyToken, deleteComment);

export default router;
