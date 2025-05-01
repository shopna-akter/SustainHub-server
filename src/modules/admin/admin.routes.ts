import { Router } from 'express';
import { getAllUsers, toggleUserStatus, getAllIdeas } from './admin.controller';
import { verifyToken, checkRole } from '../../middlewares/authMiddleware';

const router = Router();

router.get('/users', verifyToken, checkRole('ADMIN'), getAllUsers);
router.patch('/users/:id/status', verifyToken, checkRole('ADMIN'), toggleUserStatus);
router.get('/ideas', verifyToken, checkRole('ADMIN'), getAllIdeas);

export default router;
