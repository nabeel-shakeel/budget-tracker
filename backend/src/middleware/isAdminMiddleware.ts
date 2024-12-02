import { Request, Response, NextFunction } from 'express';
import { IUser } from '../models/user';

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as IUser;

  if (user.role !== 'admin') {
    res.status(403).json({ error: 'Access denied. Admins only.' });
    return;
  }

  next();
};
