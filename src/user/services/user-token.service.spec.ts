import { Test, TestingModule } from '@nestjs/testing';
import { UserTokenService } from './user-token.service';
import { mockMongoProvider } from '../../../test/helpers';
import { USER_TOKEN } from '../constants';

describe('UserTokenService', () => {
  let service: UserTokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserTokenService, mockMongoProvider(USER_TOKEN)],
    }).compile();

    service = module.get<UserTokenService>(UserTokenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
