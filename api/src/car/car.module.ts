import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CarController } from './car.controller';
import { CarService } from './car.service';
import { Car } from '../database/entities/car.entity';
import { CarClass } from '../database/entities/car-class.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Car, CarClass])],
  controllers: [CarController],
  providers: [CarService],
})
export class CarModule { }
