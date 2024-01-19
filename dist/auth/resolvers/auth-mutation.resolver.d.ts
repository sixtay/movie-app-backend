import { Account, LoginInput, LogoutResult, Tokens } from 'src/graphql';
import { UserModel, UserTokenService } from 'src/user';
import { AuthService } from '../services';
export declare class AuthMutationResolver {
    private readonly authService;
    private readonly userTokenService;
    constructor(authService: AuthService, userTokenService: UserTokenService);
    loginProvider(loginInput: LoginInput): Promise<Account>;
    login(email: string, headers: Record<string, any>): Promise<boolean>;
    register(email: string, password: string): Promise<Account>;
    logout(user: UserModel): Promise<LogoutResult>;
    refreshAuthTokens(refreshToken: string): Promise<Tokens>;
}
