import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { DevLogger } from './logger/dev.logger';
import { JsonLogger } from './logger/json.logger';
import { TskvLogger } from './logger/tskv.logger';

function createLogger() {
  const loggerType = (process.env.LOGGER || '').toLowerCase();

  if (loggerType === 'tskv') {
    return new TskvLogger();
  }

  if (loggerType === 'json') {
    return new JsonLogger();
  }

  return new DevLogger();
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.setGlobalPrefix('api/afisha');
  app.enableCors();
  app.useLogger(createLogger());
  await app.listen(3000);
}

bootstrap();
