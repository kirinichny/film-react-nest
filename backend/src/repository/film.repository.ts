import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Film, IFilm } from '../films/schemas/film.schema';

@Injectable()
export class FilmRepository {
  constructor(
    @InjectModel(Film.name) private readonly filmModel: Model<IFilm>,
  ) {}

  async findAll(): Promise<IFilm[]> {
    return this.filmModel.find().exec();
  }

  async findById(id: string): Promise<IFilm | null> {
    return this.filmModel.findOne({ id }).exec();
  }

  async update(id: string, filmData: Partial<IFilm>): Promise<IFilm | null> {
    return this.filmModel
      .findOneAndUpdate({ id }, filmData, { new: true })
      .exec();
  }
}
