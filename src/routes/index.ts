import express from 'express';
import { UserRoutes } from '../modules/user/user.route';
// import { IdeaRoutes } from '../modules/idea/idea.routes';
// import { CommentRoutes } from '../modules/comment/comment.routes';
// import { VoteRoutes } from '../modules/vote/vote.routes';
// import { CategoryRoutes } from '../modules/category/category.routes';

const router = express.Router();

router.use('/api/users', UserRoutes);
// router.use('/api/ideas', IdeaRoutes);
// router.use('/api/comments', CommentRoutes);
// router.use('/api/votes', VoteRoutes);
// router.use('/api/categories', CategoryRoutes);

export default router;
