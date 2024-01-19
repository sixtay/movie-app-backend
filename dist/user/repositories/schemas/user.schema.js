"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const mongoose_1 = require("mongoose");
exports.UserSchema = new mongoose_1.Schema({
    email: String,
    firstName: String,
    lastName: String,
    socialId: String,
    provider: String,
    role: String,
    permissions: Object,
    password: String,
}, { timestamps: true });
//# sourceMappingURL=user.schema.js.map