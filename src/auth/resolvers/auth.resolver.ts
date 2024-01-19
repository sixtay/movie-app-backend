import { Query } from '@nestjs/graphql';
import { Resolver } from '@nestjs/graphql';
import { User } from 'src/graphql';
import { UserModel } from 'src/user';
import { CurrentUser } from '../decorators';

@Resolver('Auth')
export class AuthResolver {
  @Query('me')
  me(@CurrentUser() user: UserModel): User {
    return user.toJSON();
  }
}
