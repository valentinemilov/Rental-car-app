import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Car } from '../database/entities/car.entity';
import { CarDTO } from './models/car';
import validateUniqueId from '../common/uuid-validation/uuid-validation';
import guard from '../common/guards/guard';

@Injectable()
export class CarService {
    static readonly CarNotFoundMsg = "The car is not found";
    static readonly CarIsNotAvailableMsg = "The car is not available";
    static getInvalidCarIdMsg = (carId: string): string => `The provided id ${carId} is random string`;

    public constructor(
        @InjectRepository(Car) private readonly carRepository: Repository<Car>,
    ) { }

    public async getAllFreeCars(): Promise<CarDTO[]> {
        const allFreeCars: Car[] = await this.carRepository.find({
            where: { isAvailable: true },
        });

        return allFreeCars
            .map((x: Car) => CarService.mapToCarDTO(x));
    }

    public async getIndividualCar(carId: string): Promise<CarDTO> {
        guard.should(validateUniqueId(carId), CarService.getInvalidCarIdMsg(carId));
        const foundCar: Car = await this.carRepository.findOne({
            where: { id: carId },
        });

        guard.exists(foundCar, CarService.CarNotFoundMsg);
        guard.should(foundCar.isAvailable, CarService.CarIsNotAvailableMsg);

        return CarService.mapToCarDTO(foundCar);
    }

    public static mapToCarDTO(car): CarDTO {
        const { isAvailable, ...carToReturn } = car;

        return carToReturn;
    }
}
