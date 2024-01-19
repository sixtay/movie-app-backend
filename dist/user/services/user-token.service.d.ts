/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { authConfig } from 'src/config';
import { RemoveUserTokenInput } from '../dto';
import { CreateUserTokenInput } from '../dto/create-user-token.input';
import { UpdateUserTokenInput } from '../dto/update-user-token.input';
import { UserToken, UserTokenDocument, UserTokenModel } from '../repositories/interfaces';
export declare class UserTokenService {
    private readonly userTokenModel;
    private readonly jwtService;
    private readonly config;
    constructor(userTokenModel: Model<UserTokenDocument>, jwtService: JwtService, config: ConfigType<typeof authConfig>);
    create(createUserTokenInput: Partial<CreateUserTokenInput>): Promise<UserTokenDocument & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findAll(): Promise<(UserTokenDocument & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    findOne(params: Partial<UserToken>): Promise<UserTokenDocument & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findOneById(id: string): Promise<UserTokenDocument & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    update(id: string, updateUserTokenInput: UpdateUserTokenInput): import("mongoose").Query<UserTokenDocument & {
        _id: import("mongoose").Types.ObjectId;
    }, UserTokenDocument & {
        _id: import("mongoose").Types.ObjectId;
    }, {}, UserTokenDocument>;
    remove(id: string): import("mongoose").Query<any, UserTokenDocument & {
        _id: import("mongoose").Types.ObjectId;
    }, {}, UserTokenDocument>;
    removeWhere(filter: Partial<RemoveUserTokenInput>): import("mongoose").Query<any, UserTokenDocument & {
        _id: import("mongoose").Types.ObjectId;
    }, {}, UserTokenDocument>;
    verifyUserRefreshToken(token: string): Promise<UserTokenModel>;
}
