import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ApolloDriver } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { GqlConfigService } from './config/graphql/gql-config.service';
import { UserModule } from './user';
import { AuthModule } from './auth/auth.module';
import { SendGridModule } from '@ntegral/nestjs-sendgrid';
import { MONGO_URI, SENDGRID_API_KEY } from './config/constants';
import { authConfig } from './config';
import { googleConfig } from './config/oauth/google.config';
import { MovieModule } from './movie';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        `.env.${process.env.NODE_ENV}.local`,
        `.env.${process.env.NODE_ENV}`,
      ],
      load: [authConfig, googleConfig],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        return {
          useNewUrlParser: true,
          uri: configService.get(MONGO_URI),
        };
      },
      inject: [ConfigService],
    }),
    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      useClass: GqlConfigService,
    }),
    SendGridModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        apiKey: configService.get(SENDGRID_API_KEY),
      }),
      inject: [ConfigService],
    }),
    UserModule,
    MovieModule,
    AuthModule,
  ],
})
export class AppModule {}
