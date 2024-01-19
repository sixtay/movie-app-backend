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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const nestjs_sendgrid_1 = require("@ntegral/nestjs-sendgrid");
const config_1 = require("../../config");
const bcrypt_1 = require("bcrypt");
const uuid_1 = require("uuid");
const graphql_1 = require("../../graphql");
const user_1 = require("../../user");
const enums_1 = require("../../user/enums");
const auth_apple_service_1 = require("./auth-apple.service");
const auth_google_service_1 = require("./auth-google.service");
let AuthService = class AuthService {
    constructor(authGoogleService, authAppleService, jwtService, userService, userTokenService, client, config) {
        this.authGoogleService = authGoogleService;
        this.authAppleService = authAppleService;
        this.jwtService = jwtService;
        this.userService = userService;
        this.userTokenService = userTokenService;
        this.client = client;
        this.config = config;
    }
    async login({ service, params }) {
        let loginDto;
        let socialData;
        switch (service) {
            case graphql_1.ServiceTypes.MagicLink:
                const payload = this.jwtService.decode(params.accessToken);
                const user = await this.userService.findOne(payload);
                if (!user) {
                    throw new common_1.HttpException({
                        status: common_1.HttpStatus.NOT_FOUND,
                        errors: {
                            email: 'notFound',
                        },
                    }, common_1.HttpStatus.NOT_FOUND);
                }
                const jwtToken = await this.createAccessToken(user.id);
                const userToken = await this.createUserRefreshToken(user.id);
                return {
                    id: user._id,
                    user: Object.assign({ id: user._id }, user.toJSON()),
                    tokens: {
                        accessToken: jwtToken,
                        refreshToken: userToken.token,
                    },
                };
            case graphql_1.ServiceTypes.Apple:
                loginDto = Object.assign({ idToken: params.accessToken }, params);
                socialData = await this.authAppleService.getProfileByToken(loginDto);
                return this.validateSocialLogin(graphql_1.ServiceTypes.Apple, socialData);
            case graphql_1.ServiceTypes.Google:
                loginDto = {
                    idToken: params.accessToken,
                };
                socialData = await this.authGoogleService.getProfileByToken(loginDto);
                return this.validateSocialLogin(graphql_1.ServiceTypes.Google, socialData);
            case graphql_1.ServiceTypes.Credentials:
                const userByEmail = await this.userService.findOne({
                    email: params.email,
                });
                if (!userByEmail) {
                    throw new common_1.HttpException({
                        status: common_1.HttpStatus.NOT_FOUND,
                        errors: {
                            email: 'notFound',
                        },
                    }, common_1.HttpStatus.NOT_FOUND);
                }
                const passwordMatch = await (0, bcrypt_1.compare)(params.password, userByEmail.password);
                if (!passwordMatch) {
                    throw new common_1.HttpException({
                        status: common_1.HttpStatus.UNAUTHORIZED,
                        errors: {
                            password: 'invalid',
                        },
                    }, common_1.HttpStatus.UNAUTHORIZED);
                    return;
                }
                const emailUserjwtToken = await this.createAccessToken(userByEmail.id);
                const emailUserToken = await this.createUserRefreshToken(userByEmail.id);
                return {
                    id: userByEmail._id,
                    user: Object.assign({ id: userByEmail._id }, userByEmail.toJSON()),
                    tokens: {
                        accessToken: emailUserjwtToken,
                        refreshToken: emailUserToken.token,
                    },
                };
            default:
                break;
        }
    }
    async createMagicLoginUser(email, options) {
        const user = await this.userService.findOne({ email });
        if (!user) {
            await this.userService.create({
                email,
            });
        }
        const jwtToken = await this.jwtService.sign({
            email,
        }, {
            expiresIn: '60min',
        });
        const payload = {
            to: email,
            from: 'info@unpluggdtravel.co',
            subject: 'Login to Unpluggd',
            dynamicTemplateData: {
                c2a_link: `${options === null || options === void 0 ? void 0 : options.clientLinkUrl}login/${jwtToken}`,
                subject: 'Login to Unpluggd',
            },
            templateId: 'd-de78a62281d1452d972d7dcb7771c9d0',
        };
        await this.client.send(payload);
        return true;
    }
    async validateSocialLogin(authProvider, socialData) {
        var _a;
        let user;
        const socialEmail = (_a = socialData.email) === null || _a === void 0 ? void 0 : _a.toLowerCase();
        const userByEmail = await this.userService.findOne({
            email: socialEmail,
        });
        user = await this.userService.findOne({
            socialId: socialData.id,
            provider: authProvider,
        });
        if (user) {
            if (socialEmail && !userByEmail) {
                user.email = socialEmail;
            }
            await this.userService.update(user.id, { id: user.id, user });
        }
        else if (userByEmail) {
            user = userByEmail;
        }
        else {
            user = await this.userService.create({
                email: socialEmail,
                firstName: socialData.firstName,
                lastName: socialData.lastName,
                socialId: socialData.id,
                provider: authProvider,
            });
            user = await this.userService.findOne({
                id: user.id,
            });
        }
        const jwtToken = await this.createAccessToken(user.id);
        const userToken = await this.createUserRefreshToken(user.id);
        return {
            id: user._id,
            user: Object.assign({ id: user._id }, user.toJSON()),
            tokens: {
                accessToken: jwtToken,
                refreshToken: userToken.token,
            },
        };
    }
    async refreshAuthTokens(refreshToken) {
        const { token, userId } = await this.rotateRefreshToken(refreshToken);
        const accessToken = await this.createAccessToken(userId);
        return {
            accessToken,
            refreshToken: token,
        };
    }
    async createAccessToken(userId) {
        const user = await this.userService.findOneById(userId);
        const { id, email } = user;
        const { secret } = this.config.jwt;
        const options = { secret };
        const payload = { id, email };
        return this.jwtService.signAsync(payload, options);
    }
    async createUserRefreshToken(userId) {
        const { longExpiresIn, secret } = this.config.jwt.refresh;
        const options = { expiresIn: longExpiresIn, secret };
        const id = (0, uuid_1.v4)();
        const token = await this.jwtService.signAsync({ id }, options);
        const validTill = new Date(Date.now() + longExpiresIn * 1000);
        return this.userTokenService.create({
            userId,
            token,
            validTill,
            type: enums_1.UserTokenTypeEnum.REFRESH,
        });
    }
    async rotateRefreshToken(refreshToken) {
        const userToken = await this.userTokenService.verifyUserRefreshToken(refreshToken);
        await this.userTokenService.remove(userToken._id);
        const { secret } = this.config.jwt.refresh;
        const id = (0, uuid_1.v4)();
        const exp = Math.floor(userToken.validTill.getTime() / 1000);
        const token = await this.jwtService.signAsync({ id }, { secret, expiresIn: exp });
        return this.userTokenService.create({
            type: enums_1.UserTokenTypeEnum.REFRESH,
            userId: userToken.userId,
            validTill: userToken.validTill,
            token,
        });
    }
    async registerUser(email, password) {
        if (!email || !password) {
            throw new common_1.HttpException('Email and password are required', common_1.HttpStatus.BAD_REQUEST);
        }
        const existingUser = await this.userService.findOneByEmail(email);
        if (existingUser) {
            throw new common_1.HttpException('User with this email already exists', common_1.HttpStatus.CONFLICT);
        }
        const hashedPassword = await (0, bcrypt_1.hash)(password, 10);
        const user = await this.userService.create({
            email,
            password: hashedPassword,
        });
        const jwtToken = await this.createAccessToken(user.id);
        const userToken = await this.createUserRefreshToken(user.id);
        return {
            id: user._id,
            user: Object.assign({ id: user._id }, user.toJSON()),
            tokens: {
                accessToken: jwtToken,
                refreshToken: userToken.token,
            },
        };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(5, (0, nestjs_sendgrid_1.InjectSendGrid)()),
    __param(6, (0, common_1.Inject)(config_1.authConfig.KEY)),
    __metadata("design:paramtypes", [auth_google_service_1.AuthGoogleService,
        auth_apple_service_1.AuthAppleService,
        jwt_1.JwtService,
        user_1.UserService,
        user_1.UserTokenService,
        nestjs_sendgrid_1.SendGridService, void 0])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map