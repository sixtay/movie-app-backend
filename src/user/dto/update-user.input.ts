import { CreateUserInput } from './create-user.input';

export class UpdateUserInput {
  id: string;
  user: CreateUserInput;
}
