"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequirePermission = void 0;
const common_1 = require("@nestjs/common");
const permission_constants_1 = require("../constants/permission.constants");
const RequirePermission = (permissions) => (0, common_1.SetMetadata)(permission_constants_1.PERMISSION_KEY, permissions);
exports.RequirePermission = RequirePermission;
//# sourceMappingURL=permission.decorator.js.map