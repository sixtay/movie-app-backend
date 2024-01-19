import { Permission } from '../enums/permission.enum';
import { Role } from '../enums/role.enum';
export declare const PERMISSION_KEY = "permissions";
export declare const PERMISSION_BY_ROLE: {
    [key in Role]: Permission[];
};
