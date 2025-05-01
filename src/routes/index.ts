import express from 'express';
import authRoutes from '../modules/auth/auth.routes';
import adminRoutes from '../modules/admin/admin.routes';
import categoryRoutes from '../modules/category/category.routes';
import ideaRoutes from '../modules/idea/idea.routes';
import commentRoutes from '../modules/comment/comment.routes';
import voteRoutes from '../modules/vote/vote.routes';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/admin', adminRoutes);
router.use('/categories', categoryRoutes);
router.use('/ideas', ideaRoutes);
router.use('/comments', commentRoutes);
router.use('/votes', voteRoutes);

export default router;
