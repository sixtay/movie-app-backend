import { ObjectId } from 'mongoose';
import { UserDocument } from './user-document.interface';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  socialId: string;
  provider: string;
  password: string;
}

export type UserModel = UserDocument & { _id: ObjectId };
