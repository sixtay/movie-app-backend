import { Schema } from 'mongoose';
import { MovieDocument } from '../../interfaces';

export const MovieSchema = new Schema<MovieDocument>(
  {
    title: { type: String, required: true },
    director: { type: String, required: false },
    image: { type: String, required: false },
    releaseDate: { type: Date, required: false },
    duration: { type: Number, required: false },
    genre: { type: String, required: false },
    publishedYear: { type: Number, required: true },
  },
  { timestamps: true },
);
