import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { InjectSendGrid, SendGridService } from '@ntegral/nestjs-sendgrid';
import { MailDataRequired } from '@sendgrid/mail';
import { authConfig } from 'src/config';
import { compare, hash } from 'bcrypt';
import { v4 } from 'uuid';

import { Account, LoginInput, ServiceTypes, Tokens } from 'src/graphql';
import {
  UserDocument,
  UserModel,
  UserService,
  UserTokenModel,
  UserTokenService,
} from 'src/user';
import { UserTokenTypeEnum } from 'src/user/enums';
import { SocialInterface } from '../interfaces';
import { AuthAppleService } from './auth-apple.service';
import { AuthGoogleService } from './auth-google.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly authGoogleService: AuthGoogleService,
    private readonly authAppleService: AuthAppleService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly userTokenService: UserTokenService,
    @InjectSendGrid() private readonly client: SendGridService,
    @Inject(authConfig.KEY)
    private readonly config: ConfigType<typeof authConfig>,
  ) {}
  async login({ service, params }: LoginInput): Promise<Account> {
    let loginDto;
    let socialData;
    switch (service) {
      case ServiceTypes.MagicLink:
        const payload = this.jwtService.decode(params.accessToken);

        const user = await this.userService.findOne(
          payload as Partial<UserModel>,
        );

        if (!user) {
          throw new HttpException(
            {
              status: HttpStatus.NOT_FOUND,
              errors: {
                email: 'notFound',
              },
            },
            HttpStatus.NOT_FOUND,
          );
        }
        const jwtToken = await this.createAccessToken(user.id);

        const userToken = await this.createUserRefreshToken(user.id);

        return {
          id: user._id,
          user: { id: user._id, ...user.toJSON() },
          tokens: {
            accessToken: jwtToken,
            refreshToken: userToken.token,
          },
        };
      case ServiceTypes.Apple:
        loginDto = {
          idToken: params.accessToken,
          ...params,
        };
        socialData = await this.authAppleService.getProfileByToken(loginDto);
        return this.validateSocialLogin(ServiceTypes.Apple, socialData);

      case ServiceTypes.Google:
        loginDto = {
          idToken: params.accessToken,
        };
        socialData = await this.authGoogleService.getProfileByToken(loginDto);
        return this.validateSocialLogin(ServiceTypes.Google, socialData);

      case ServiceTypes.Credentials:
        const userByEmail = await this.userService.findOne({
          email: params.email,
        });

        if (!userByEmail) {
          throw new HttpException(
            {
              status: HttpStatus.NOT_FOUND,
              errors: {
                email: 'notFound',
              },
            },
            HttpStatus.NOT_FOUND,
          );
        }

        const passwordMatch = await compare(
          params.password,
          userByEmail.password,
        );

        if (!passwordMatch) {
          throw new HttpException(
            {
              status: HttpStatus.UNAUTHORIZED,
              errors: {
                password: 'invalid',
              },
            },
            HttpStatus.UNAUTHORIZED,
          );
          return;
        }

        const emailUserjwtToken = await this.createAccessToken(userByEmail.id);

        const emailUserToken = await this.createUserRefreshToken(
          userByEmail.id,
        );

        return {
          id: userByEmail._id,
          user: { id: userByEmail._id, ...userByEmail.toJSON() },
          tokens: {
            accessToken: emailUserjwtToken,
            refreshToken: emailUserToken.token,
          },
        };
      default:
        break;
    }
  }

  async createMagicLoginUser(
    email: string,
    options?: { clientLinkUrl: string },
  ): Promise<boolean> {
    const user = await this.userService.findOne({ email });

    if (!user) {
      await this.userService.create({
        email,
      });
    }

    const jwtToken = await this.jwtService.sign(
      {
        email,
      },
      {
        expiresIn: '60min',
      },
    );

    const payload: Partial<MailDataRequired> = {
      to: email,
      from: 'info@unpluggdtravel.co',
      subject: 'Login to Unpluggd',
      dynamicTemplateData: {
        c2a_link: `${options?.clientLinkUrl}login/${jwtToken}`,
        subject: 'Login to Unpluggd',
      },
      templateId: 'd-de78a62281d1452d972d7dcb7771c9d0',
    };

    await this.client.send(payload);
    return true;
  }

  private async validateSocialLogin(
    authProvider: ServiceTypes,
    socialData: SocialInterface,
  ): Promise<Account> {
    let user: UserDocument;
    const socialEmail = socialData.email?.toLowerCase();

    const userByEmail = await this.userService.findOne({
      email: socialEmail,
    });

    user = await this.userService.findOne({
      socialId: socialData.id,
      provider: authProvider,
    });

    if (user) {
      if (socialEmail && !userByEmail) {
        user.email = socialEmail;
      }
      await this.userService.update(user.id, { id: user.id, user });
    } else if (userByEmail) {
      user = userByEmail;
    } else {
      user = await this.userService.create({
        email: socialEmail,
        firstName: socialData.firstName,
        lastName: socialData.lastName,
        socialId: socialData.id,
        provider: authProvider,
      });

      user = await this.userService.findOne({
        id: user.id,
      });
    }

    const jwtToken = await this.createAccessToken(user.id);

    const userToken = await this.createUserRefreshToken(user.id);

    return {
      id: user._id,
      user: { id: user._id, ...user.toJSON() },
      tokens: {
        accessToken: jwtToken,
        refreshToken: userToken.token,
      },
    };
  }

  async refreshAuthTokens(refreshToken: string): Promise<Tokens> {
    const { token, userId } = await this.rotateRefreshToken(refreshToken);
    const accessToken = await this.createAccessToken(userId);

    return {
      accessToken,
      refreshToken: token,
    };
  }
  async createAccessToken(userId: UserModel['id']): Promise<string> {
    const user = await this.userService.findOneById(userId);
    const { id, email } = user;
    const { secret } = this.config.jwt;
    const options: JwtSignOptions = { secret };
    const payload = { id, email };
    return this.jwtService.signAsync(payload, options);
  }

  async createUserRefreshToken(userId: string): Promise<UserTokenModel> {
    const { longExpiresIn, secret } = this.config.jwt.refresh;
    const options: JwtSignOptions = { expiresIn: longExpiresIn, secret };
    const id = v4();
    const token = await this.jwtService.signAsync({ id }, options);
    const validTill = new Date(Date.now() + longExpiresIn * 1000);
    return this.userTokenService.create({
      userId,
      token,
      validTill,
      type: UserTokenTypeEnum.REFRESH,
    });
  }

  async rotateRefreshToken(refreshToken: string) {
    const userToken = await this.userTokenService.verifyUserRefreshToken(
      refreshToken,
    );
    await this.userTokenService.remove(userToken._id);

    const { secret } = this.config.jwt.refresh;
    const id = v4();
    const exp = Math.floor(userToken.validTill.getTime() / 1000);
    const token = await this.jwtService.signAsync(
      { id },
      { secret, expiresIn: exp },
    );

    return this.userTokenService.create({
      type: UserTokenTypeEnum.REFRESH,
      userId: userToken.userId,
      validTill: userToken.validTill,
      token,
    });
  }

  async registerUser(email: string, password: string): Promise<Account> {
    if (!email || !password) {
      throw new HttpException(
        'Email and password are required',
        HttpStatus.BAD_REQUEST,
      );
    }

    const existingUser = await this.userService.findOneByEmail(email);
    if (existingUser) {
      throw new HttpException(
        'User with this email already exists',
        HttpStatus.CONFLICT,
      );
    }

    const hashedPassword = await hash(password, 10);

    const user = await this.userService.create({
      email,
      password: hashedPassword,
    });

    const jwtToken = await this.createAccessToken(user.id);

    const userToken = await this.createUserRefreshToken(user.id);

    return {
      id: user._id,
      user: { id: user._id, ...user.toJSON() },
      tokens: {
        accessToken: jwtToken,
        refreshToken: userToken.token,
      },
    };
  }
}
