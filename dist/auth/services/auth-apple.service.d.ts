import { ConfigService } from '@nestjs/config';
import { SocialInterface } from '../interfaces';
import { AuthAppleLoginDto } from '../dto';
export declare class AuthAppleService {
    private configService;
    constructor(configService: ConfigService);
    getProfileByToken(loginDto: AuthAppleLoginDto): Promise<SocialInterface>;
}
