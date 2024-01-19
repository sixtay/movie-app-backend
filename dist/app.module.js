"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const apollo_1 = require("@nestjs/apollo");
const graphql_1 = require("@nestjs/graphql");
const mongoose_1 = require("@nestjs/mongoose");
const gql_config_service_1 = require("./config/graphql/gql-config.service");
const user_1 = require("./user");
const auth_module_1 = require("./auth/auth.module");
const nestjs_sendgrid_1 = require("@ntegral/nestjs-sendgrid");
const constants_1 = require("./config/constants");
const config_2 = require("./config");
const google_config_1 = require("./config/oauth/google.config");
const movie_1 = require("./movie");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: [
                    `.env.${process.env.NODE_ENV}.local`,
                    `.env.${process.env.NODE_ENV}`,
                ],
                load: [config_2.authConfig, google_config_1.googleConfig],
                isGlobal: true,
            }),
            mongoose_1.MongooseModule.forRootAsync({
                useFactory: (configService) => {
                    return {
                        useNewUrlParser: true,
                        uri: configService.get(constants_1.MONGO_URI),
                    };
                },
                inject: [config_1.ConfigService],
            }),
            graphql_1.GraphQLModule.forRootAsync({
                driver: apollo_1.ApolloDriver,
                useClass: gql_config_service_1.GqlConfigService,
            }),
            nestjs_sendgrid_1.SendGridModule.forRootAsync({
                useFactory: async (configService) => ({
                    apiKey: configService.get(constants_1.SENDGRID_API_KEY),
                }),
                inject: [config_1.ConfigService],
            }),
            user_1.UserModule,
            movie_1.MovieModule,
            auth_module_1.AuthModule,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map