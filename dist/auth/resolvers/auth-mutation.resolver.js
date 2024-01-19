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
exports.AuthMutationResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const user_1 = require("../../user");
const enums_1 = require("../../user/enums");
const decorators_1 = require("../decorators");
const jwt_auth_guard_1 = require("../guards/jwt-auth.guard");
const services_1 = require("../services");
let AuthMutationResolver = class AuthMutationResolver {
    constructor(authService, userTokenService) {
        this.authService = authService;
        this.userTokenService = userTokenService;
    }
    async loginProvider(loginInput) {
        const { service, params } = loginInput;
        const result = await this.authService.login({ service, params });
        return result;
    }
    async login(email, headers) {
        try {
            await this.authService.createMagicLoginUser(email, {
                clientLinkUrl: headers['client-link-url'],
            });
        }
        catch (error) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
                errors: {
                    password: 'incorrectPassword',
                },
            }, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
        }
        return true;
    }
    async register(email, password) {
        return this.authService.registerUser(email, password);
    }
    async logout(user) {
        await this.userTokenService.removeWhere({
            userId: user.id,
            type: enums_1.UserTokenTypeEnum.REFRESH,
        });
        return Promise.resolve({
            success: true,
        });
    }
    async refreshAuthTokens(refreshToken) {
        return this.authService.refreshAuthTokens(refreshToken);
    }
};
__decorate([
    (0, graphql_1.Mutation)('loginProvider'),
    __param(0, (0, graphql_1.Args)('loginInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthMutationResolver.prototype, "loginProvider", null);
__decorate([
    (0, graphql_1.Mutation)('login'),
    __param(0, (0, graphql_1.Args)('email')),
    __param(1, (0, decorators_1.ContextHeaders)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AuthMutationResolver.prototype, "login", null);
__decorate([
    (0, graphql_1.Mutation)('register'),
    __param(0, (0, graphql_1.Args)('email')),
    __param(1, (0, graphql_1.Args)('password')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AuthMutationResolver.prototype, "register", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, graphql_1.Mutation)('logout'),
    __param(0, (0, decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthMutationResolver.prototype, "logout", null);
__decorate([
    (0, graphql_1.Mutation)('refreshAuthTokens'),
    __param(0, (0, graphql_1.Args)('refreshToken')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthMutationResolver.prototype, "refreshAuthTokens", null);
AuthMutationResolver = __decorate([
    (0, graphql_1.Resolver)('Auth'),
    __metadata("design:paramtypes", [services_1.AuthService,
        user_1.UserTokenService])
], AuthMutationResolver);
exports.AuthMutationResolver = AuthMutationResolver;
//# sourceMappingURL=auth-mutation.resolver.js.map