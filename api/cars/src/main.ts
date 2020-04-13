/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

import { AppModule } from './app.module';
import { ApplicationErrorFilter } from './common/filter/car-error.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.useStaticAssets(join(__dirname, '..', 'pictures'), { prefix: '/public' });
  app.useGlobalFilters(new ApplicationErrorFilter());
  await app.listen(3001);
}
bootstrap();
