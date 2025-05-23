import express from 'express';
import { register, login, forgotPassword, resetPassword, loginWithMetamask } from '../controllers/auth.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/login-metamask', loginWithMetamask);

// Token verification
router.get('/verify-token', protect, (req, res) => {
    // If protect middleware passes, the token is valid and user is attached to req
    res.status(200).json({ success: true, user: (req as any).user });
});

export default router;
