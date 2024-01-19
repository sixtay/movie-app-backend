import { Request } from 'express';
import { UserModel } from 'src/user';

export interface AuthenticatedRequestInterface extends Request {
  user: UserModel;
}
