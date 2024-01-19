"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const user_1 = require("../user");
const resolvers_1 = require("./resolvers");
const auth_resolver_1 = require("./resolvers/auth.resolver");
const services_1 = require("./services");
const permission_service_1 = require("./services/access-control/permission.service");
const jwt_strategy_1 = require("./strategies/jwt.strategy");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            passport_1.PassportModule,
            user_1.UserModule,
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    secret: configService.get('auth.jwt.secret'),
                    signOptions: {
                        expiresIn: configService.get('auth.jwt.expires'),
                    },
                }),
            }),
        ],
        providers: [
            resolvers_1.AuthMutationResolver,
            auth_resolver_1.AuthResolver,
            services_1.AuthService,
            services_1.AuthGoogleService,
            services_1.AuthAppleService,
            jwt_strategy_1.JwtStrategy,
            permission_service_1.PermissionService,
        ],
        exports: [permission_service_1.PermissionService],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map