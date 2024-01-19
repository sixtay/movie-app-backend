import { CreateUserTokenInput } from './create-user-token.input';

export class UpdateUserTokenInput {
  id: string;
  userToken: CreateUserTokenInput;
}
