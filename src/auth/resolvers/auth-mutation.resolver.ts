import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { hash } from 'bcrypt';
import { Account, LoginInput, LogoutResult, Tokens } from 'src/graphql';
import { UserModel, UserTokenService } from 'src/user';
import { UserTokenTypeEnum } from 'src/user/enums';
import { ContextHeaders, CurrentUser } from '../decorators';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { AuthService } from '../services';

@Resolver('Auth')
export class AuthMutationResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly userTokenService: UserTokenService,
  ) {}

  @Mutation('loginProvider')
  async loginProvider(@Args('loginInput') loginInput: LoginInput) {
    const { service, params } = loginInput;
    const result = await this.authService.login({ service, params });
    return result;
  }

  @Mutation('login')
  async login(
    @Args('email') email: string,
    @ContextHeaders() headers: Record<string, any>,
  ): Promise<boolean> {
    try {
      await this.authService.createMagicLoginUser(email, {
        clientLinkUrl: headers['client-link-url'],
      });
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            password: 'incorrectPassword',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return true;
  }

  @Mutation('register')
  async register(
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<Account> {
    return this.authService.registerUser(email, password);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation('logout')
  async logout(@CurrentUser() user: UserModel): Promise<LogoutResult> {
    await this.userTokenService.removeWhere({
      userId: user.id,
      type: UserTokenTypeEnum.REFRESH,
    });
    return Promise.resolve({
      success: true,
    });
  }

  @Mutation('refreshAuthTokens')
  async refreshAuthTokens(
    @Args('refreshToken') refreshToken: string,
  ): Promise<Tokens> {
    return this.authService.refreshAuthTokens(refreshToken);
  }
}
