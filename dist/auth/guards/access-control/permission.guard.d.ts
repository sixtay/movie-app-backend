import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PermissionService } from 'src/auth/services/access-control/permission.service';
export declare class PermissionGuard implements CanActivate {
    private reflector;
    private permissionService;
    constructor(reflector: Reflector, permissionService: PermissionService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
