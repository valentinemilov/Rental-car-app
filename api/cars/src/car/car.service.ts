/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Car } from '../database/entities/car.entity';
import { CarDTO } from './models/car';
import { CarError } from '../common/exceptions/car.error';

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
            .map((x: Car) => {
                const { isAvailable, ...carsToReturn } = x;

                return carsToReturn;
            })
    }

    public async getIndividualCar(carId: string): Promise<CarDTO> {
        const foundCar: Car = await this.carRepository.findOne({
            where: {
                id: carId,
                isAvailable: true,
            }
        })

        if (foundCar === undefined || foundCar === null) {
            throw new CarError('The required car is not found', 400);
        }

        const { isAvailable, ...carToReturn } = foundCar;

        return carToReturn;
    }
}

