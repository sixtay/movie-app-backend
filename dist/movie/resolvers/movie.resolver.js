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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const dto_1 = require("../dto");
const services_1 = require("../services");
let MovieResolver = class MovieResolver {
    constructor(movieService) {
        this.movieService = movieService;
    }
    create(createMovieInput) {
        return this.movieService.create(createMovieInput);
    }
    findAll() {
        return this.movieService.findAll();
    }
    findOne(id) {
        return this.movieService.findOne(id);
    }
    update(updateMovieInput) {
        return this.movieService.update(updateMovieInput.id, updateMovieInput);
    }
    remove(id) {
        return this.movieService.remove(id);
    }
};
__decorate([
    (0, graphql_1.Mutation)('createMovie'),
    __param(0, (0, graphql_1.Args)('createMovieInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateMovieInput]),
    __metadata("design:returntype", void 0)
], MovieResolver.prototype, "create", null);
__decorate([
    (0, graphql_1.Query)('movies'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MovieResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)('movie'),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MovieResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)('updateMovie'),
    __param(0, (0, graphql_1.Args)('updateMovieInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.UpdateMovieInput]),
    __metadata("design:returntype", void 0)
], MovieResolver.prototype, "update", null);
__decorate([
    (0, graphql_1.Mutation)('removeMovie'),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MovieResolver.prototype, "remove", null);
MovieResolver = __decorate([
    (0, graphql_1.Resolver)('Movie'),
    __metadata("design:paramtypes", [services_1.MovieService])
], MovieResolver);
exports.MovieResolver = MovieResolver;
//# sourceMappingURL=movie.resolver.js.map