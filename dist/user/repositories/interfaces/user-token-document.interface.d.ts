import { Document } from 'mongoose';
export interface UserTokenDocument extends Document {
    userId: string;
    token: string;
    type: string;
    validTill: Date;
}
