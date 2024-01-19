"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContextHeaders = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
exports.ContextHeaders = (0, common_1.createParamDecorator)((data, context) => {
    const ctx = graphql_1.GqlExecutionContext.create(context);
    return ctx.getContext().req.headers;
});
//# sourceMappingURL=context-headers.decorator.js.map