import { Test, TestingModule } from '@nestjs/testing';
import { mockMongoProvider } from '../../../test/helpers';
import { MOVIE } from '../constants';
import { MovieService } from './movie.service';

describe('MovieService', () => {
  let service: MovieService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MovieService, mockMongoProvider(MOVIE)],
    }).compile();

    service = module.get<MovieService>(MovieService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
