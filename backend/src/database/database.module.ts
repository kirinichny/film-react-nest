import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ERROR_MESSAGES } from '../constants/error-messages.constants';
import { sprintf } from 'sprintf-js';
import { join } from 'node:path';

@Module({})
export class DatabaseModule {
  static register(): DynamicModule {
    const databaseDriver = process.env.DATABASE_DRIVER;

    if (databaseDriver === 'postgres') {
      const typeOrmModule = TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
          type: 'postgres',
          host: configService.get<string>('DATABASE_HOST'),
          port: configService.get<number>('DATABASE_PORT'),
          username: configService.get<string>('DATABASE_USERNAME'),
          password: configService.get<string>('DATABASE_PASSWORD'),
          database: configService.get<string>('DATABASE_NAME'),
          entities: [join(__dirname, '..', '**', '*.entity{.ts,.js}')],
          synchronize: true,
        }),
      });

      return {
        module: DatabaseModule,
        imports: [typeOrmModule],
        exports: [typeOrmModule],
      };
    } else if (databaseDriver === 'mongo') {
      const mongooseModule = MongooseModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          uri: configService.get<string>(
            'DATABASE_URL',
            'mongodb://127.0.0.1:27017/afisha',
          ),
        }),
      });

      return {
        module: DatabaseModule,
        imports: [mongooseModule],
        exports: [mongooseModule],
      };
    }

    throw new Error(
      sprintf(ERROR_MESSAGES.UNKNOWN_DATABASE_TYPE, databaseDriver),
    );
  }
}
