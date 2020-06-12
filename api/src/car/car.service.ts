/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Car } from '../database/entities/car.entity';
import { CarDTO } from './models/car';
import validateUniqueId from '../common/uuid-validation/uuid-validation';
import guard from '../common/guards/guard';
import { CarsDTO } from './models/cars';
import { UpdateCarDTO } from './models/update-car';
import { CarClass } from '../database/entities/car-class.entity';
import { CarClassDTO } from './models/car-class';

@Injectable()
export class CarService {
    static readonly CarNotFoundMsg = "The car is not found";
    static readonly CarIsNotAvailableMsg = "The car is not available";
    static getInvalidCarIdMsg = (carId: string): string => `The provided id ${carId} is random string`;
    static readonly CarClassNotFoundMsg = "Invalid car class";

    public constructor(
        @InjectRepository(Car) private readonly carRepository: Repository<Car>,
        @InjectRepository(CarClass) private readonly carClassRepository: Repository<CarClass>,
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

    public async getIndividualFreeCar(carId: string): Promise<CarDTO> {
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

    public async getIndividualCar(carId: string): Promise<CarDTO> {
        guard.should(validateUniqueId(carId), CarService.getInvalidCarIdMsg(carId));
        const foundCar: Car = await this.carRepository.findOne({
            where: { id: carId },
        });

        guard.exists(foundCar, CarService.CarNotFoundMsg);

        const classEntity = foundCar.carClass;
        const mappedCar = CarService.mapToAvailableCar(foundCar);

        return CarService.composeCarObject(classEntity, mappedCar);
    }

    public async uploadCarImage(carId: string, picture: string): Promise<CarsDTO> {
        guard.should(validateUniqueId(carId), CarService.getInvalidCarIdMsg(carId));
        const foundCar: Car = await this.carRepository.findOne({
            where: { id: carId },
        });

        guard.exists(foundCar, CarService.CarNotFoundMsg);
        const carToUpdate = { ...foundCar, picture };

        const classEntity = foundCar.carClass;
        const savedCar = await this.carRepository.save(carToUpdate);
        const mappedCar = CarService.mapToEntityCar(savedCar);

        return CarService.composeCarObject(classEntity, mappedCar);
    }

    public async updateCar(carId: string, car: UpdateCarDTO): Promise<CarsDTO> {
        guard.should(validateUniqueId(carId), CarService.getInvalidCarIdMsg(carId));
        const foundCar: Car = await this.carRepository.findOne({
            where: { id: carId },
        });
        guard.exists(foundCar, CarService.CarNotFoundMsg);

        if (car.class) {
            const carClass: CarClass = await this.carClassRepository.findOne({
                where: { class: car.class },
            });
            guard.exists(carClass, CarService.CarClassNotFoundMsg);
            foundCar.carClass = carClass;
        }

        const { brand, model } = car;
        const carToUpdate = { ...foundCar, brand, model };
        const updatedCar = await this.carRepository.save(carToUpdate);
        const savedCarClass = updatedCar.carClass;
        const mappedCar = CarService.mapToEntityCar(updatedCar);

        return CarService.composeCarObject(savedCarClass, mappedCar);
    }

    public async getCarClasses(): Promise<CarClassDTO[]> {
        const carClasses = await this.carClassRepository.find();

        return carClasses.map((x: CarClass) => ({ ...x }));
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
