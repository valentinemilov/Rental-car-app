/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Car } from '../database/entities/car.entity';
import { CarDTO } from './models/car';
import validateUniqueId from '../common/uuid-validation/uuid-validation';
import guard from '../common/guards/guard';

@Injectable()
export class CarService {
    public constructor(
        @InjectRepository(Car) private readonly carRepository: Repository<Car>
    ) { }

    public async getAllFreeCars(): Promise<CarDTO[]> {
        const allFreeCars: Car[] = await this.carRepository.find({
            where: { isAvailable: true },
        });

        return allFreeCars
            .map((x: Car) => this.mapToCarDTO(x));
    }

    public async getIndividualCar(carId: string): Promise<CarDTO> {
        guard.should(validateUniqueId(carId), `The provided id ${carId} is random string`);
        const foundCar: Car = await this.carRepository.findOne({
            where: { id: carId },
        });

        guard.exists(foundCar, 'The car is not found');
        guard.exists(foundCar && foundCar.isAvailable, 'The car is not available');

        return this.mapToCarDTO(foundCar);
    }

    private mapToCarDTO(car: Car) {
        const { isAvailable, ...carToReturn } = car;

        return carToReturn;
    }
}
