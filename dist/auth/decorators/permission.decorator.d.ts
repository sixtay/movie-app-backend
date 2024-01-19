import { Permission } from '../enums/permission.enum';
export declare const RequirePermission: (permissions: Permission | Permission[]) => import("@nestjs/common").CustomDecorator<string>;
