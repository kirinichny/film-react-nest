import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Film, FilmSchema } from '../schemas/film.schema';
import { TOKENS } from '../../constants/tokens';
import { FilmMongooseRepository } from '../../repository/film.mongoose.repository.impl';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Film.name, schema: FilmSchema }]),
  ],
  providers: [
    {
      provide: TOKENS.FILM_REPOSITORY,
      useClass: FilmMongooseRepository,
    },
  ],
  exports: [TOKENS.FILM_REPOSITORY],
})
export class FilmMongoModule {}
