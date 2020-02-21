import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { CarModule } from './car/car.module';

@Module({
  imports: [DatabaseModule, CarModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
