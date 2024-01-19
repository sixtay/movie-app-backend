import { Permission } from '../enums/permission.enum';
import { Role } from '../enums/role.enum';

export const PERMISSION_KEY = 'permissions';

export const PERMISSION_BY_ROLE: { [key in Role]: Permission[] } = {
  [Role.OWNER]: Object.values(Permission),
  [Role.DEVELOPER]: [
    Permission.MODERATION,
    Permission.BAN_USERS,
    Permission.UNBAN_USERS,
  ],
  [Role.ADMIN]: [
    Permission.MODERATION,
    Permission.BAN_USERS,
    Permission.UNBAN_USERS,
  ],
  [Role.MOD]: [
    Permission.MODERATION,
    Permission.BAN_USERS,
    Permission.UNBAN_USERS,
  ],
};
