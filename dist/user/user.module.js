"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const constants_1 = require("./constants");
const repositories_1 = require("./repositories");
const resolvers_1 = require("./resolvers");
const services_1 = require("./services");
let UserModule = class UserModule {
};
UserModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: constants_1.USER, schema: repositories_1.UserSchema },
                { name: constants_1.USER_TOKEN, schema: repositories_1.UserTokenSchema },
            ]),
            jwt_1.JwtModule.register({}),
        ],
        providers: [resolvers_1.UserResolver, services_1.UserService, services_1.UserTokenService],
        exports: [services_1.UserService, services_1.UserTokenService],
    })
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map