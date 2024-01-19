import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user';
import { AuthMutationResolver } from './resolvers';
import { AuthResolver } from './resolvers/auth.resolver';
import { AuthAppleService, AuthGoogleService, AuthService } from './services';
import { PermissionService } from './services/access-control/permission.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('auth.jwt.secret'),
        signOptions: {
          expiresIn: configService.get('auth.jwt.expires'),
        },
      }),
    }),
  ],
  providers: [
    AuthMutationResolver,
    AuthResolver,
    AuthService,
    AuthGoogleService,
    AuthAppleService,
    JwtStrategy,
    PermissionService,
  ],
  exports: [PermissionService],
})
export class AuthModule {}
