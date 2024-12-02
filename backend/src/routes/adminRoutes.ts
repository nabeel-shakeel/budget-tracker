import express from 'express';
import { authenticate, isAdmin } from '../middleware';
import { getUsers, updateUser } from '../controllers/adminController';

const adminRouter = express.Router();

adminRouter.use(authenticate);
adminRouter.use(isAdmin);

adminRouter.get('/users', getUsers);
adminRouter.put('/users/:id', updateUser);

export { adminRouter };