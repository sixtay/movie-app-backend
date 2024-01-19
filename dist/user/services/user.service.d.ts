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
import { Model } from 'mongoose';
import { CreateUserInput } from '../dto/create-user.input';
import { UpdateUserInput } from '../dto/update-user.input';
import { User, UserDocument, UserModel } from '../repositories/interfaces';
export declare class UserService {
    private readonly userModel;
    constructor(userModel: Model<UserDocument>);
    create(createUserInput: Partial<CreateUserInput>): Promise<UserDocument & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findAll(): Promise<(UserDocument & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    findOne(params: Partial<User>): Promise<UserDocument & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findOneById(id: string): Promise<UserDocument & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findOneByEmail(email: string): Promise<UserDocument & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    update(id: string, updateUserInput: UpdateUserInput): import("mongoose").Query<UserDocument & {
        _id: import("mongoose").Types.ObjectId;
    }, UserDocument & {
        _id: import("mongoose").Types.ObjectId;
    }, {}, UserDocument>;
    remove(id: string): import("mongoose").Query<any, UserDocument & {
        _id: import("mongoose").Types.ObjectId;
    }, {}, UserDocument>;
    findRoleAndPermissions(gainIdOrUser: number | UserModel): Promise<{
        rolePermissions: import("../../auth/enums/permission.enum").Permission[];
        userPermissions: {
            banUsers?: boolean;
            unbanUsers?: boolean;
            moderation?: boolean;
            creditUser?: boolean;
        };
    }>;
}
