import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MOVIE } from '../constants';
import { CreateMovieInput, UpdateMovieInput } from '../dto';
import { MovieDocument } from '../interfaces';

@Injectable()
export class MovieService {
  constructor(
    @InjectModel(MOVIE)
    private readonly movieModel: Model<MovieDocument>,
  ) {}

  async create(createMovieInput: CreateMovieInput) {
    return this.movieModel.create(createMovieInput);
  }

  findAll() {
    return this.movieModel.find().exec();
  }

  findOne(id: string) {
    return this.movieModel.findOne({ _id: id }).exec();
  }

  update(id: string, updateMovieInput: UpdateMovieInput) {
    return this.movieModel.findOneAndUpdate(
      { _id: id },
      { ...updateMovieInput.movie },
      { returnOriginal: false },
    );
  }

  remove(id: string) {
    return this.movieModel.remove({ _id: id });
  }
}
