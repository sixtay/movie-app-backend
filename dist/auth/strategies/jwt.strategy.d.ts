import { ConfigType } from '@nestjs/config';
import { ModuleRef } from '@nestjs/core';
import { JwtPayloadType } from 'src/auth/types';
import { authConfig } from 'src/config';
import { UserModel } from 'src/user';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private moduleRef;
    constructor(config: ConfigType<typeof authConfig>, moduleRef: ModuleRef);
    validate(request: Request, payload: JwtPayloadType, done: (err: Error | null, userLogin: UserModel | false) => UserModel): Promise<UserModel>;
}
export {};
