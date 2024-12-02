import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  budgetLimit: number;
  role: 'user' | 'admin';
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  profile?: {
    address: {
      streetAddress: string;
      city: string;
      state: string;
      zipCode: string;
      phoneNumber: string;
    };
    bio: {
      about: string;
      jobTitle: string;
      dob: string;
      education: string;
      gender: string;
    };
    financial: {
      budget: number;
    };
  };
}

const UserSchema: Schema = new Schema({
  firstName: { type: String, required: true, length: 50 },
  lastName: { type: String, required: true, length: 50 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, length: 8 },
  budgetLimit: { type: Number, required: true, min: 1, max: 9999999 },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
  profile: {
    address: {
      streetAddress: { type: String },
      city: { type: String },
      state: { type: String },
      zipCode: { type: String },
      phoneNumber: { type: String },
    },
    bio: {
      about: { type: String },
      jobTitle: { type: String },
      dob: { type: String },
      education: { type: String },
      gender: { type: String },
    },
    financial: {
      budget: { type: Number },
    },
  },
});

export default mongoose.model<IUser>('User', UserSchema);
