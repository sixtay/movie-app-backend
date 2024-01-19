import {
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { AuthenticatedRequestInterface } from 'src/auth/interfaces';
import { UserModel } from 'src/user';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext): AuthenticatedRequestInterface {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }

  handleRequest<UserModel>(
    err: string | Record<string, unknown>,
    user: UserModel,
    info: string | Record<string, unknown> | unknown,
  ): UserModel {
    if (err || !user) {
      throw (
        err ||
        new HttpException(
          {
            status: HttpStatus.UNAUTHORIZED,
            errors: {
              user: 'unauthenticated',
            },
          },
          HttpStatus.UNAUTHORIZED,
        )
      );
    }
    return user;
  }
}
