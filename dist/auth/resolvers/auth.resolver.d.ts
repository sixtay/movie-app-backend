import { User } from 'src/graphql';
import { UserModel } from 'src/user';
export declare class AuthResolver {
    me(user: UserModel): User;
}
