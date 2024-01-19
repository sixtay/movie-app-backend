import { ConfigService } from '@nestjs/config';
import { AuthGoogleLoginDto } from '../dto';
import { SocialInterface } from '../interfaces';
export declare class AuthGoogleService {
    private configService;
    private google;
    constructor(configService: ConfigService);
    getProfileByToken(loginDto: AuthGoogleLoginDto): Promise<SocialInterface>;
}
