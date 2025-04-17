import {
  FilmDetailsDto,
  FilmsListResponseDto,
  ScheduleDto,
  ScheduleListResponseDto,
} from '../dto/films.dto';
import { IFilm, ISchedule } from '../schemas/film.schema';

export function toFilmDto(entity: IFilm): FilmDetailsDto {
  return {
    id: entity.id,
    rating: entity.rating,
    director: entity.director,
    tags: entity.tags,
    title: entity.title,
    about: entity.about,
    description: entity.description,
    image: entity.image,
    cover: entity.cover,
  };
}

export function toScheduleDto(entity: ISchedule): ScheduleDto {
  return {
    id: entity.id,
    daytime: entity.daytime.toISOString(),
    hall: Number(entity.hall),
    rows: entity.rows,
    seats: entity.seats,
    price: entity.price,
    taken: entity.taken,
  };
}

export function toFilmsListResponseDto(films: IFilm[]): FilmsListResponseDto {
  return {
    total: films.length,
    items: films.map((film) => toFilmDto(film)),
  };
}

export function toScheduleListResponseDto(
  schedules: ISchedule[],
): ScheduleListResponseDto {
  return {
    total: schedules.length,
    items: schedules.map((schedule) => toScheduleDto(schedule)),
  };
}
