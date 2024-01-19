import { Test, TestingModule } from '@nestjs/testing';
import { MovieResolver } from './movie.resolver';
import { mockMongoProvider } from '../../../test/helpers';
import { MOVIE } from '../constants';
import { MovieService } from '../services';

describe('MovieResolver', () => {
  let resolver: MovieResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MovieResolver, MovieService, mockMongoProvider(MOVIE)],
    }).compile();

    resolver = module.get<MovieResolver>(MovieResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
