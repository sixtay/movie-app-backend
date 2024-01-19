import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { USER, USER_TOKEN } from './constants';
import { UserSchema, UserTokenSchema } from './repositories';
import { UserResolver } from './resolvers';
import { UserService, UserTokenService } from './services';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: USER, schema: UserSchema },
      { name: USER_TOKEN, schema: UserTokenSchema },
    ]),
    JwtModule.register({}),
  ],
  providers: [UserResolver, UserService, UserTokenService],
  exports: [UserService, UserTokenService],
})
export class UserModule {}
