import { Permission } from 'src/auth/enums/permission.enum';
import { UserModel, UserService } from 'src/user';
export declare class PermissionService {
    private userService;
    constructor(userService: UserService);
    validate(user: UserModel, requiredPermissions: Permission | Permission[]): Promise<boolean>;
    hasUserPermission(gainIdOrUser: number | UserModel, requiredPermissions: Permission | Permission[]): Promise<boolean>;
}
