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
exports.UserTokenService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const config_1 = require("../../config");
const constants_1 = require("../constants");
let UserTokenService = class UserTokenService {
    constructor(userTokenModel, jwtService, config) {
        this.userTokenModel = userTokenModel;
        this.jwtService = jwtService;
        this.config = config;
    }
    create(createUserTokenInput) {
        return this.userTokenModel.create(createUserTokenInput);
    }
    findAll() {
        return this.userTokenModel.find().exec();
    }
    findOne(params) {
        return this.userTokenModel.findOne(params).exec();
    }
    findOneById(id) {
        return this.userTokenModel.findOne({ _id: id }).exec();
    }
    update(id, updateUserTokenInput) {
        return this.userTokenModel.findOneAndUpdate({ _id: id }, Object.assign({}, updateUserTokenInput.userToken), { returnOriginal: false });
    }
    remove(id) {
        return this.userTokenModel.remove({ _id: id });
    }
    removeWhere(filter) {
        return this.userTokenModel.remove(filter);
    }
    async verifyUserRefreshToken(token) {
        const { secret } = this.config.jwt.refresh;
        try {
            await this.jwtService.verifyAsync(token, { secret });
        }
        catch (err) {
            await this.userTokenModel.deleteOne({ token });
            throw err;
        }
        const userToken = await this.userTokenModel.findOne({ token });
        if (!userToken) {
            throw new common_1.NotFoundException({
                message: 'REFRESH_TOKEN_NOT_FOUND',
            });
        }
        return userToken;
    }
};
UserTokenService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(constants_1.USER_TOKEN)),
    __param(2, (0, common_1.Inject)(config_1.authConfig.KEY)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService, void 0])
], UserTokenService);
exports.UserTokenService = UserTokenService;
//# sourceMappingURL=user-token.service.js.map