import express from 'express';
import { authenticate, validateProfileUpdate } from '../middleware';
import {
  getUserProfile,
  updateUserProfile,
} from '../controllers/profileController';

const profileRouter = express.Router();

profileRouter.use(authenticate);

profileRouter.get('/', getUserProfile);
profileRouter.put('/', validateProfileUpdate, updateUserProfile);

export { profileRouter };
