export class CreateUserTokenInput {
  userId: string;
  token: string;
  type: string;
  validTill: Date;
}
