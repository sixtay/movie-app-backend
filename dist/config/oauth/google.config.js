"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleConfig = void 0;
const config_1 = require("@nestjs/config");
exports.googleConfig = (0, config_1.registerAs)('google', () => ({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
}));
//# sourceMappingURL=google.config.js.map