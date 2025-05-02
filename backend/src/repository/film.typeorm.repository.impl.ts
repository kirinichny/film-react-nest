import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FilmEntity } from '../films/entities/film.entity';
import { IFilmRepository } from './film.repository.interface';
import { IFilm } from '../films/interfaces/film.interface';

@Injectable()
export class FilmTypeormRepository implements IFilmRepository {
  constructor(
    @InjectRepository(FilmEntity)
    private readonly filmRepository: Repository<FilmEntity>,
  ) {}

  async findAll(): Promise<IFilm[]> {
    const films = await this.filmRepository.find({ relations: ['schedule'] });
    return films.map(this.toIFilm);
  }

  async findById(id: string): Promise<IFilm | null> {
    const film = await this.filmRepository.findOne({
      where: { id },
      relations: ['schedule'],
    });
    return film ? this.toIFilm(film) : null;
  }

  async update(id: string, filmData: Partial<IFilm>): Promise<IFilm | null> {
    const film = await this.filmRepository.findOne({
      where: { id },
      relations: ['schedule'],
    });

    if (!film) {
      return null;
    }

    if (filmData.title !== undefined) film.title = filmData.title;
    if (filmData.rating !== undefined) film.rating = filmData.rating;
    if (filmData.director !== undefined) film.director = filmData.director;
    if (filmData.tags !== undefined) film.tags = filmData.tags;
    if (filmData.image !== undefined) film.image = filmData.image;
    if (filmData.cover !== undefined) film.cover = filmData.cover;
    if (filmData.about !== undefined) film.about = filmData.about;
    if (filmData.description !== undefined)
      film.description = filmData.description;

    if (filmData.schedule !== undefined) {
      film.schedule = film.schedule.map((existingSchedule) => {
        const updatedSchedule = filmData.schedule.find(
          (s) => s.id === existingSchedule.id,
        );

        if (updatedSchedule) {
          existingSchedule.daytime = updatedSchedule.daytime.toISOString();
          existingSchedule.hall = updatedSchedule.hall;
          existingSchedule.rows = updatedSchedule.rows;
          existingSchedule.seats = updatedSchedule.seats;
          existingSchedule.price = updatedSchedule.price;
          existingSchedule.taken = updatedSchedule.taken;
          console.log(existingSchedule);
        }
        return existingSchedule;
      });
    }

    await this.filmRepository.save(film);

    return this.toIFilm(film);
  }

  private toIFilm(film: FilmEntity): IFilm {
    return {
      id: film.id,
      title: film.title,
      rating: film.rating,
      director: film.director,
      tags: film.tags,
      image: film.image,
      cover: film.cover,
      about: film.about,
      description: film.description,
      schedule: film.schedule.map((schedule) => ({
        id: schedule.id,
        daytime: new Date(schedule.daytime),
        hall: schedule.hall,
        rows: schedule.rows,
        seats: schedule.seats,
        price: schedule.price,
        taken: schedule.taken,
      })),
    };
  }
}
