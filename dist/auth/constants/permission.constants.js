"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PERMISSION_BY_ROLE = exports.PERMISSION_KEY = void 0;
const permission_enum_1 = require("../enums/permission.enum");
const role_enum_1 = require("../enums/role.enum");
exports.PERMISSION_KEY = 'permissions';
exports.PERMISSION_BY_ROLE = {
    [role_enum_1.Role.OWNER]: Object.values(permission_enum_1.Permission),
    [role_enum_1.Role.DEVELOPER]: [
        permission_enum_1.Permission.MODERATION,
        permission_enum_1.Permission.BAN_USERS,
        permission_enum_1.Permission.UNBAN_USERS,
    ],
    [role_enum_1.Role.ADMIN]: [
        permission_enum_1.Permission.MODERATION,
        permission_enum_1.Permission.BAN_USERS,
        permission_enum_1.Permission.UNBAN_USERS,
    ],
    [role_enum_1.Role.MOD]: [
        permission_enum_1.Permission.MODERATION,
        permission_enum_1.Permission.BAN_USERS,
        permission_enum_1.Permission.UNBAN_USERS,
    ],
};
//# sourceMappingURL=permission.constants.js.map