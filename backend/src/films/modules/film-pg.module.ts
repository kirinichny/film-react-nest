import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilmEntity } from '../entities/film.entity';
import { TOKENS } from '../../constants/tokens';
import { FilmTypeormRepository } from '../../repository/film.typeorm.repository.impl';

@Module({
  imports: [TypeOrmModule.forFeature([FilmEntity])],
  providers: [
    {
      provide: TOKENS.FILM_REPOSITORY,
      useClass: FilmTypeormRepository,
    },
  ],
  exports: [TOKENS.FILM_REPOSITORY],
})
export class FilmPgModule {}
