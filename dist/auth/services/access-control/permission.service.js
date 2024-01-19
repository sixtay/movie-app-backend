"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionService = void 0;
const common_1 = require("@nestjs/common");
const user_1 = require("../../../user");
let PermissionService = class PermissionService {
    constructor(userService) {
        this.userService = userService;
    }
    async validate(user, requiredPermissions) {
        return this.hasUserPermission(user.id, requiredPermissions);
    }
    async hasUserPermission(gainIdOrUser, requiredPermissions) {
        const { rolePermissions, userPermissions } = await this.userService.findRoleAndPermissions(gainIdOrUser);
        const permissions = Array.isArray(requiredPermissions)
            ? requiredPermissions
            : [requiredPermissions];
        return permissions.some((requiredPermission) => !!((rolePermissions.includes(requiredPermission) &&
            userPermissions[requiredPermission] !== false) ||
            userPermissions[requiredPermission]));
    }
};
PermissionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_1.UserService])
], PermissionService);
exports.PermissionService = PermissionService;
//# sourceMappingURL=permission.service.js.map