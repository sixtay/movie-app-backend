import { Schema } from 'mongoose';
import { UserTokenDocument } from '../interfaces';

export const UserTokenSchema = new Schema<UserTokenDocument>(
  {
    userId: String,
    token: String,
    type: String,
    validTill: Date,
  },
  { timestamps: true },
);
