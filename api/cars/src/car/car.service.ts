/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Car } from '../database/entities/car.entity';
import { CarDTO } from './models/car';
import { ApplicationError } from '../common/exceptions/app.error';
import validateUniqueId from '../common/uuid-validation/uuid-validation';

@Injectable()
export class CarService {
    public constructor(
        @InjectRepository(Car) private readonly carRepository: Repository<Car>
    ) { }

    public async getAllFreeCars(): Promise<CarDTO[]> {
        const allFreeCars: Car[] = await this.carRepository.find({
            where: { isAvailable: true },
        })

        return allFreeCars
            .map((x: Car) => this.mapToCarDTO(x));
    }

    public async getIndividualCar(carId: string): Promise<CarDTO> {
        if (!validateUniqueId(carId)) {
            throw new ApplicationError(`The provided id ${carId} is random string`, 400);
        }

        const foundCar: Car = await this.carRepository.findOne({
            where: { id: carId },
        })

        if (!foundCar) {
            throw new ApplicationError('The car is not found', 404);
        }

        if (foundCar && !foundCar.isAvailable) {
            throw new ApplicationError('The car is not available', 400);
        }

        return this.mapToCarDTO(foundCar);
    }

    private mapToCarDTO(car: Car) {
        const { isAvailable, ...carToReturn } = car;

        return carToReturn;
    }
}
