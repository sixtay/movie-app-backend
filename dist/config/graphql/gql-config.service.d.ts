import { ApolloDriverConfig } from '@nestjs/apollo';
import { GqlOptionsFactory } from '@nestjs/graphql';
export declare class GqlConfigService implements GqlOptionsFactory {
    createGqlOptions(): ApolloDriverConfig;
}
