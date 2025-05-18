import express from 'express';
import { 
  getAllUsers, 
  getUserById, 
  updateUser, 
  deleteUser,
  getProfile,
  updateProfile
} from '../controllers/user.controller.js';
import { protect, restrictTo } from '../middleware/auth.middleware.js';

const router = express.Router();

// Protected routes - require authentication
router.use(protect);

// User profile routes
router.get('/profile', getProfile);
router.patch('/profile', updateProfile);

// Admin only routes
router.use(restrictTo('ADMIN'));
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
