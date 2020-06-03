/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Car } from '../database/entities/car.entity';
import { CarDTO } from './models/car';
import validateUniqueId from '../common/uuid-validation/uuid-validation';
import guard from '../common/guards/guard';
import { CarsDTO } from './models/cars';

@Injectable()
export class CarService {
    static readonly CarNotFoundMsg = "The car is not found";
    static readonly CarIsNotAvailableMsg = "The car is not available";
    static getInvalidCarIdMsg = (carId: string): string => `The provided id ${carId} is random string`;

    public constructor(
        @InjectRepository(Car) private readonly carRepository: Repository<Car>,
    ) { }

    public async getAllCars(): Promise<CarsDTO[]> {
        const allCars = await this.carRepository.find();
 
        return allCars.map((car: Car) => {
            const classEntity = car.carClass;
            const mappedCar = CarService.mapToEntityCar(car);

            return CarService.composeCarObject(classEntity, mappedCar);
        });
    }

    public async getAllFreeCars(): Promise<CarDTO[]> {
        const allFreeCars: Car[] = await this.carRepository.find({
            where: { isAvailable: true },
        });

        return allFreeCars
            .map((car: Car) => {
                const classEntity = car.carClass;
                const mappedCar = CarService.mapToAvailableCar(car);

                return CarService.composeCarObject(classEntity, mappedCar);
            });
    }

    public async getIndividualCar(carId: string): Promise<CarDTO> {
        guard.should(validateUniqueId(carId), CarService.getInvalidCarIdMsg(carId));
        const foundCar: Car = await this.carRepository.findOne({
            where: { id: carId },
        });

        guard.exists(foundCar, CarService.CarNotFoundMsg);
        guard.should(foundCar.isAvailable, CarService.CarIsNotAvailableMsg);

        const classEntity = foundCar.carClass;
        const mappedCar = CarService.mapToAvailableCar(foundCar);

        return CarService.composeCarObject(classEntity, mappedCar);
    }

    public static mapToAvailableCar(car) {
        const { carClass, isAvailable, ...carToReturn } = car;

        return carToReturn;
    }

    public static mapToEntityCar(car) {
        const { carClass, ...carToReturn } = car;

        return carToReturn;
    }

    public static composeCarObject(carClass, car) {
        const { id, ...carClassToReturn } = carClass;

        return { ...car, ...carClassToReturn };
    }
}
