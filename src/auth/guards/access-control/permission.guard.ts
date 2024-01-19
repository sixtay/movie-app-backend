import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { PERMISSION_KEY } from 'src/auth/constants/permission.constants';
import { Permission } from 'src/auth/enums/permission.enum';
import { PermissionService } from 'src/auth/services/access-control/permission.service';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private permissionService: PermissionService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<
      Permission | Permission[]
    >(PERMISSION_KEY, [context.getHandler(), context.getClass()]);
    if (!requiredPermissions) return true;
    const ctx = GqlExecutionContext.create(context);

    const { user } = ctx.getContext().req;
    if (!user) return false;
    const valid = await this.permissionService.validate(
      user,
      requiredPermissions,
    );
    if (!valid && process.env.NODE_ENV !== 'production') {
      const permissionString = Array.isArray(requiredPermissions)
        ? requiredPermissions.join('or')
        : requiredPermissions;
      throw new ForbiddenException(
        `Resource requires ${permissionString} permission`,
      );
    }
    return valid;
  }
}
