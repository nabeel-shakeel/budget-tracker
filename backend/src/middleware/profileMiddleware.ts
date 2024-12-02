import { Request, Response, NextFunction } from 'express';

const forbiddenFields = ['email', 'password', 'role'];

export const validateProfileUpdate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  for (const field of forbiddenFields) {
    if (field in req.body) {
      res.status(400).json({ error: `Field '${field}' cannot be updated` });
      return;
    }
  }

  next();
};
