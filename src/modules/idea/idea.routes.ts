import { Router } from 'express';
import { createIdea, updateIdea, submitIdea, approveIdea, rejectIdea } from './idea.controller';
import { verifyToken, checkRole } from '../../middlewares/authMiddleware';

const router = Router();

router.post('/ideas', verifyToken, createIdea);
router.put('/ideas/:id', verifyToken, updateIdea);
router.put('/ideas/:id/submit', verifyToken, submitIdea);
router.put('/ideas/:id/approve', verifyToken, checkRole('ADMIN'), approveIdea);
router.put('/ideas/:id/reject', verifyToken, checkRole('ADMIN'), rejectIdea);

export default router;