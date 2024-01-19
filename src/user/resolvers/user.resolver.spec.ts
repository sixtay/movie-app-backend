import { Test, TestingModule } from '@nestjs/testing';
import { mockMongoProvider } from '../../../test/helpers';
import { UserResolver } from './user.resolver';
import { UserService } from '../services';
import { USER } from '../constants';

describe('UserResolver', () => {
  let resolver: UserResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserResolver, UserService, mockMongoProvider(USER)],
    }).compile();

    resolver = module.get<UserResolver>(UserResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
