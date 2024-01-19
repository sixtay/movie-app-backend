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
import { CreateMovieInput, UpdateMovieInput } from '../dto';
import { MovieService } from '../services';
export declare class MovieResolver {
    private readonly movieService;
    constructor(movieService: MovieService);
    create(createMovieInput: CreateMovieInput): Promise<import("..").MovieDocument & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findAll(): Promise<(import("..").MovieDocument & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    findOne(id: string): Promise<import("..").MovieDocument & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    update(updateMovieInput: UpdateMovieInput): import("mongoose").Query<import("..").MovieDocument & {
        _id: import("mongoose").Types.ObjectId;
    }, import("..").MovieDocument & {
        _id: import("mongoose").Types.ObjectId;
    }, {}, import("..").MovieDocument>;
    remove(id: string): import("mongoose").Query<any, import("..").MovieDocument & {
        _id: import("mongoose").Types.ObjectId;
    }, {}, import("..").MovieDocument>;
}
