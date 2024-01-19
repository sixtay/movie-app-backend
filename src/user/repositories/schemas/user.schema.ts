import { Schema } from 'mongoose';
import { UserDocument } from '../interfaces';

export const UserSchema = new Schema<UserDocument>(
  {
    email: String,
    firstName: String,
    lastName: String,
    socialId: String,
    provider: String,
    role: String,
    permissions: Object,
    password: String,
  },
  { timestamps: true },
);
