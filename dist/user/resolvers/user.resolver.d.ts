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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { UserService } from '../services/user.service';
import { CreateUserInput } from '../dto/create-user.input';
import { UpdateUserInput } from '../dto/update-user.input';
export declare class UserResolver {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserInput: CreateUserInput): Promise<import("..").UserDocument & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findAll(): Promise<(import("..").UserDocument & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    findOne(id: string): Promise<import("..").UserDocument & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    update(updateUserInput: UpdateUserInput): import("mongoose").Query<import("..").UserDocument & {
        _id: import("mongoose").Types.ObjectId;
    }, import("..").UserDocument & {
        _id: import("mongoose").Types.ObjectId;
    }, {}, import("..").UserDocument>;
    remove(id: string): import("mongoose").Query<any, import("..").UserDocument & {
        _id: import("mongoose").Types.ObjectId;
    }, {}, import("..").UserDocument>;
}
