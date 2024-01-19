import { Injectable } from '@nestjs/common';
import { Permission } from 'src/auth/enums/permission.enum';
import { UserModel, UserService } from 'src/user';

@Injectable()
export class PermissionService {
  constructor(private userService: UserService) {}

  /**
   * Validate if session user has required permission
   * @param user
   * @param requiredPermission
   * @returns
   */
  async validate(
    user: UserModel,
    requiredPermissions: Permission | Permission[],
  ): Promise<boolean> {
    return this.hasUserPermission(user.id, requiredPermissions);
  }

  async hasUserPermission(
    gainIdOrUser: number | UserModel,
    requiredPermissions: Permission | Permission[],
  ) {
    const { rolePermissions, userPermissions } =
      await this.userService.findRoleAndPermissions(gainIdOrUser);
    const permissions = Array.isArray(requiredPermissions)
      ? requiredPermissions
      : [requiredPermissions];
    return permissions.some(
      (requiredPermission) =>
        !!(
          (rolePermissions.includes(requiredPermission) &&
            userPermissions[requiredPermission] !== false) ||
          userPermissions[requiredPermission]
        ),
    );
  }
}
