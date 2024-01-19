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
exports.PermissionGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const graphql_1 = require("@nestjs/graphql");
const permission_constants_1 = require("../../constants/permission.constants");
const permission_service_1 = require("../../services/access-control/permission.service");
let PermissionGuard = class PermissionGuard {
    constructor(reflector, permissionService) {
        this.reflector = reflector;
        this.permissionService = permissionService;
    }
    async canActivate(context) {
        const requiredPermissions = this.reflector.getAllAndOverride(permission_constants_1.PERMISSION_KEY, [context.getHandler(), context.getClass()]);
        if (!requiredPermissions)
            return true;
        const ctx = graphql_1.GqlExecutionContext.create(context);
        const { user } = ctx.getContext().req;
        if (!user)
            return false;
        const valid = await this.permissionService.validate(user, requiredPermissions);
        if (!valid && process.env.NODE_ENV !== 'production') {
            const permissionString = Array.isArray(requiredPermissions)
                ? requiredPermissions.join('or')
                : requiredPermissions;
            throw new common_1.ForbiddenException(`Resource requires ${permissionString} permission`);
        }
        return valid;
    }
};
PermissionGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        permission_service_1.PermissionService])
], PermissionGuard);
exports.PermissionGuard = PermissionGuard;
//# sourceMappingURL=permission.guard.js.map