import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { ContextIdFactory, ModuleRef } from '@nestjs/core';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayloadType } from 'src/auth/types';
import { authConfig } from 'src/config';
import { UserModel } from 'src/user';
import { UserService } from 'src/user/services';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(authConfig.KEY)
    config: ConfigType<typeof authConfig>,
    private moduleRef: ModuleRef,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.jwt.secret,
      passReqToCallback: true,
    });
  }

  async validate(
    request: Request,
    payload: JwtPayloadType,
    done: (err: Error | null, userLogin: UserModel | false) => UserModel,
  ): Promise<UserModel> {
    const contextId = ContextIdFactory.getByRequest(request);
    const userService = await this.moduleRef.resolve(UserService, contextId, {
      strict: false,
    });
    const user = await userService.findOneById(payload.id);
    if (!user) {
      return done(new UnauthorizedException(), false);
    }
    return done(null, user);
  }
}
