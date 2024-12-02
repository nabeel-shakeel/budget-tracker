import express from 'express';
import { signup, signin, forgotPassword } from '../controllers/authController';

const userRouter = express.Router();

// user routes
userRouter.post('/signup', signup);
userRouter.post('/signin', signin);
userRouter.post('/forgot-password', forgotPassword);

export { userRouter };
