"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GqlConfigService = void 0;
const path_1 = require("path");
const apollo_server_core_1 = require("apollo-server-core");
class GqlConfigService {
    createGqlOptions() {
        return {
            typePaths: [(0, path_1.join)(__dirname, '..', '..', '**', '*.graphql')],
            fieldResolverEnhancers: ['guards', 'interceptors'],
            introspection: true,
            playground: false,
            plugins: [(0, apollo_server_core_1.ApolloServerPluginLandingPageLocalDefault)()],
            definitions: {
                path: (0, path_1.join)(process.cwd(), 'src/graphql.ts'),
                emitTypenameField: true,
            },
        };
    }
}
exports.GqlConfigService = GqlConfigService;
//# sourceMappingURL=gql-config.service.js.map