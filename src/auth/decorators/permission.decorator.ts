import { SetMetadata } from '@nestjs/common';
import { PERMISSION_KEY } from '../constants/permission.constants';
import { Permission } from '../enums/permission.enum';

export const RequirePermission = (permissions: Permission | Permission[]) =>
  SetMetadata(PERMISSION_KEY, permissions);
