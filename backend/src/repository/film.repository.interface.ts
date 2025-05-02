import { IFilm } from '../films/interfaces/film.interface';

export interface IFilmRepository {
  findAll(): Promise<IFilm[]>;

  findById(id: string): Promise<IFilm | null>;

  update(id: string, filmData: Partial<IFilm>): Promise<IFilm | null>;
}
