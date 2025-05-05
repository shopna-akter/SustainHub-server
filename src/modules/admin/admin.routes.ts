import { Router } from 'express';
import { getAllUsers, toggleUserStatus, getAllIdeas, updateUserRole } from './admin.controller';
import { verifyToken, checkRole } from '../../middlewares/authMiddleware';

const router = Router();

router.get('/users', verifyToken, checkRole('ADMIN'), getAllUsers);
router.patch('/users/:id/status', verifyToken, checkRole('ADMIN'), toggleUserStatus);
router.patch('/users/:id/role', verifyToken, checkRole('ADMIN'), updateUserRole);
router.get('/ideas', verifyToken, checkRole('ADMIN'), getAllIdeas);

export default router;
