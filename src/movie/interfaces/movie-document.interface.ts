import { Document } from 'mongoose';

export interface MovieDocument extends Document {
  title: string;
  director: string;
  releaseDate: Date;
  duration: number;
  genre: string;
  image: string;
  publishedYear: number;
}
