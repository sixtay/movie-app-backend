import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MOVIE } from './constants';
import { MovieSchema } from './repositories';
import { MovieResolver } from './resolvers';
import { MovieService } from './services';

@Module({
  imports: [MongooseModule.forFeature([{ name: MOVIE, schema: MovieSchema }])],
  providers: [MovieResolver, MovieService],
})
export class MovieModule {}
