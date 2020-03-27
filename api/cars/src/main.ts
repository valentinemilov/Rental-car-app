import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { ApplicationErrorFilter } from './common/filter/car-error.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.useGlobalFilters(new ApplicationErrorFilter());
  await app.listen(3001);
}
bootstrap();
