"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authConfig = void 0;
const config_1 = require("@nestjs/config");
exports.authConfig = (0, config_1.registerAs)('auth', () => ({
    jwt: {
        secret: process.env.AUTH_JWT_SECRET,
        expires: process.env.AUTH_JWT_TOKEN_EXPIRES_IN,
        refresh: {
            secret: process.env.JWT_REFRESH_SECRET,
            expiresIn: parseInt(process.env.JWT_REFRESH_TTL, 10),
            longExpiresIn: parseInt(process.env.JWT_REFRESH_LONG_TTL, 10),
        },
    },
}));
//# sourceMappingURL=auth.config.js.map