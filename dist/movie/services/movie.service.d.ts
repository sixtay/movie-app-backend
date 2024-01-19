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
import { CreateMovieInput, UpdateMovieInput } from '../dto';
import { MovieDocument } from '../interfaces';
export declare class MovieService {
    private readonly movieModel;
    constructor(movieModel: Model<MovieDocument>);
    create(createMovieInput: CreateMovieInput): Promise<MovieDocument & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findAll(): Promise<(MovieDocument & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    findOne(id: string): Promise<MovieDocument & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    update(id: string, updateMovieInput: UpdateMovieInput): import("mongoose").Query<MovieDocument & {
        _id: import("mongoose").Types.ObjectId;
    }, MovieDocument & {
        _id: import("mongoose").Types.ObjectId;
    }, {}, MovieDocument>;
    remove(id: string): import("mongoose").Query<any, MovieDocument & {
        _id: import("mongoose").Types.ObjectId;
    }, {}, MovieDocument>;
}
