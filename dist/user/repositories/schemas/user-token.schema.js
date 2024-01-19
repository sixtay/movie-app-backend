"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserTokenSchema = void 0;
const mongoose_1 = require("mongoose");
exports.UserTokenSchema = new mongoose_1.Schema({
    userId: String,
    token: String,
    type: String,
    validTill: Date,
}, { timestamps: true });
//# sourceMappingURL=user-token.schema.js.map