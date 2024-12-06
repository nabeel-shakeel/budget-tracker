import { Request, Response } from 'express';
import User from '../models/user';

export const getUsers = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, name = '' } = req.query;
    const pageNumber = parseInt(page as string, 10);
    const limitNumber = parseInt(limit as string, 10);

    const nameQuery = name
      ? {
          $or: [
            { firstName: { $regex: name, $options: 'i' } },
            { lastName: { $regex: name, $options: 'i' } },
          ],
        }
      : {};

    const users = await User.find(nameQuery)
      .select('-password')
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber);

    const totalUsers = await User.countDocuments(nameQuery);
    const serializedUsers = users.map((user) => ({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      profile: user.profile,
    }));

    res.status(200).json({
      data: serializedUsers,
      total: totalUsers,
      currentPage: page,
      totalPages: Math.ceil(totalUsers / limitNumber),
    });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { firstName, lastName, phoneNumber, budget } = req.body;

  try {
    const user = await User.findById(id);

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;

    if (!user.profile) {
      user.profile = {
        address: {
          streetAddress: '',
          city: '',
          state: '',
          zipCode: '',
          phoneNumber: phoneNumber || '',
        },
        bio: {
          about: '',
          jobTitle: '',
          dob: '',
          education: '',
          gender: '',
        },
        financial: {
          budget: budget || 0,
        },
      };
    } else {
      user.profile.address.phoneNumber =
        phoneNumber || user.profile.address.phoneNumber;
      user.profile.financial.budget = budget || user.profile.financial.budget;
    }

    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    if (user.role === 'admin') {
      res.status(403).json({ error: 'Cannot delete an admin user' });
      return;
    }

    await user.deleteOne();
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
