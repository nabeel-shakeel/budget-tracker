import express from 'express';
import {
  signup,
  signin,
  forgotPassword,
  resetPassword,
} from '../controllers/authController';

const authRouter = express.Router();

// auth routes
authRouter.post('/signup', signup);
authRouter.post('/signin', signin);
authRouter.post('/forgot-password', forgotPassword);
authRouter.post('/reset-password', resetPassword);

export { authRouter };
