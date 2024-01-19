import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/guards';
import { CreateMovieInput, UpdateMovieInput } from '../dto';
import { MovieService } from '../services';

@Resolver('Movie')
export class MovieResolver {
  constructor(private readonly movieService: MovieService) {}

  @Mutation('createMovie')
  create(@Args('createMovieInput') createMovieInput: CreateMovieInput) {
    return this.movieService.create(createMovieInput);
  }

  @Query('movies')
  findAll() {
    return this.movieService.findAll();
  }

  @Query('movie')
  findOne(@Args('id') id: string) {
    return this.movieService.findOne(id);
  }

  @Mutation('updateMovie')
  update(@Args('updateMovieInput') updateMovieInput: UpdateMovieInput) {
    return this.movieService.update(updateMovieInput.id, updateMovieInput);
  }

  @Mutation('removeMovie')
  remove(@Args('id') id: string) {
    return this.movieService.remove(id);
  }
}
