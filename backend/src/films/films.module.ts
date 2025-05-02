import { Module } from '@nestjs/common';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { FilmMongoModule } from './modules/film-mongo.module';
import { FilmPgModule } from './modules/film-pg.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    process.env.DATABASE_DRIVER === 'mongo' ? FilmMongoModule : FilmPgModule,
  ],
  controllers: [FilmsController],
  providers: [FilmsService],
  exports: [FilmsService],
})
export class FilmsModule {}
