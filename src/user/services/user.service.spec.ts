import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { mockMongoProvider } from '../../../test/helpers';
import { USER } from '../constants';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, mockMongoProvider(USER)],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
