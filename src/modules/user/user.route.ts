import { Router } from 'express';
import { registerUser, loginUser, getUserProfile } from './user.controller';
import { authMiddleware } from '../../middleware/authMiddleware';

const router = Router();

// User routes
router.post('/register', registerUser);  // Register new user
router.post('/login', loginUser);        // User login
router.get('/profile', authMiddleware, getUserProfile);  // Get user profile (requires auth)

export default router;
