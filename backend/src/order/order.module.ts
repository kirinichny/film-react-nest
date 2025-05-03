import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { FilmPgModule } from '../films/modules/film-pg.module';
import { FilmMongoModule } from '../films/modules/film-mongo.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    process.env.DATABASE_DRIVER === 'mongo' ? FilmMongoModule : FilmPgModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
