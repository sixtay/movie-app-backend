import { ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthenticatedRequestInterface } from 'src/auth/interfaces';
declare const JwtAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class JwtAuthGuard extends JwtAuthGuard_base {
    getRequest(context: ExecutionContext): AuthenticatedRequestInterface;
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
    handleRequest<UserModel>(err: string | Record<string, unknown>, user: UserModel, info: string | Record<string, unknown> | unknown): UserModel;
}
export {};
