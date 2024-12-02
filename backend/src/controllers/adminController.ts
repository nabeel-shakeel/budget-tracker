import { Request, Response } from 'express';
import User, { IUser } from '../models/user';

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { firstName, lastName, budgetLimit } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { firstName, lastName, budgetLimit },
      { new: true }
    ).select('-password');
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
