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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const permission_constants_1 = require("../../auth/constants/permission.constants");
const constants_1 = require("../constants");
let UserService = class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    create(createUserInput) {
        return this.userModel.create(createUserInput);
    }
    findAll() {
        return this.userModel.find().exec();
    }
    findOne(params) {
        return this.userModel.findOne(params).exec();
    }
    findOneById(id) {
        return this.userModel.findOne({ _id: id }).exec();
    }
    findOneByEmail(email) {
        return this.userModel.findOne({ email }).exec();
    }
    update(id, updateUserInput) {
        return this.userModel.findOneAndUpdate({ _id: id }, Object.assign({}, updateUserInput.user), { returnOriginal: false });
    }
    remove(id) {
        return this.userModel.remove({ _id: id });
    }
    async findRoleAndPermissions(gainIdOrUser) {
        const user = typeof gainIdOrUser === 'number'
            ? await this.userModel.findOne({
                where: { gainId: gainIdOrUser },
                select: ['gainId', 'role', 'permissions'],
            })
            : gainIdOrUser;
        if (!user)
            throw new common_1.HttpException({
                status: common_1.HttpStatus.UNAUTHORIZED,
                errors: {
                    message: 'You are not authorized to access this resource',
                },
            }, common_1.HttpStatus.UNAUTHORIZED);
        const { role, permissions } = user;
        return {
            rolePermissions: permission_constants_1.PERMISSION_BY_ROLE[role] || [],
            userPermissions: permissions || {},
        };
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(constants_1.USER)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map