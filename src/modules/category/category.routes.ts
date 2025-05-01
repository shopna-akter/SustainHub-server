import { Router } from 'express';
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from './category.controller';
import { verifyToken, isAdmin } from '../../middlewares/authMiddleware';

const router = Router();

router.post('/', verifyToken, isAdmin, createCategory);
router.get('/', getAllCategories);
router.get('/:id', getCategoryById);
router.put('/:id', verifyToken, isAdmin, updateCategory);
router.delete('/:id', verifyToken, isAdmin, deleteCategory);

export default router;
