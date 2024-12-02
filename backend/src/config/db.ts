import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { createInitialAdmin } from '../utils/initialAdmin';

dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log('MongoDB Connected Successfully');
    await createInitialAdmin();
  } catch (error) {
    console.error('MongoDB Connection Error:', error);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = {
  connectDB,
};
