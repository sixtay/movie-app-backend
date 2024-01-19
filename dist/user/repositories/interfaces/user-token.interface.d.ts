import { ObjectId } from 'mongoose';
import { UserTokenDocument } from './user-token-document.interface';
export interface UserToken {
    id: string;
    userId: string;
    token: string;
    type: string;
    validTill: Date;
}
export type UserTokenModel = UserTokenDocument & {
    _id: ObjectId;
};
