import User from '../models/user';
import bcrypt from 'bcryptjs';

export const createInitialAdmin = async () => {
  try {
    // check if admin already exists
    const existingAdmin = await User.findOne({
      email: 'admin@emumba.com',
      role: 'admin',
    });

    if (existingAdmin) {
      console.log('Admin user already exists');
      return;
    }

    const hashedPassword = await bcrypt.hash('Test@1234', 10);
    // create new admin user
    const adminUser = new User({
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@emumba.com',
      password: hashedPassword,
      role: 'admin',
      budgetLimit: 100000,
    });

    // save the admin user
    await adminUser.save();
    console.log('Initial admin user created successfully');
  } catch (error) {
    console.error('Error creating initial admin user:', error);
  }
};
