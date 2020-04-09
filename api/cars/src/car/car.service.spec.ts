/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Repository } from 'typeorm';

import { Car } from '../database/entities/car.entity';
import { CarService } from './car.service';

const carId = 'a1fd0475-aaaa-4f6b-b2b5-3e95034c96b4';

const getCar = (isAvailable = true): Car => ({
    id: carId,
    model: 'Series 1',
    class: 'A',
    price: 100,
    picture: 'string',
    isAvailable,
    brand: "BMW",
    contracts: Promise.resolve([]),
});

const getCarService = () => {
    const carRepository = new Repository<Car>();

    jest.spyOn(carRepository, 'findOne')
        .mockImplementation(async () => Promise.resolve(getCar()));

    const carService = new CarService(carRepository);

    return { carRepository, carService };
};

describe('ContractService', () => {

    describe('getIndividualCar() should', () => {

        it('call the carRepository findOne() once with correct parameter', async () => {
            const { carRepository, carService } = getCarService();

            // Act
            await carService.getIndividualCar(carId);

            // Assert
            const expectedObject = {
                where: { id: carId },
            };

            expect(carRepository.findOne).toHaveBeenCalledTimes(1);
            expect(carRepository.findOne).toHaveBeenCalledWith(expectedObject);
        });

        it('throw if id is not unique identifier', async () => {
            const { carService } = getCarService();

            // Assert
            const invalidCarId = 'invalid id';

            // Act && Assert
            await expect(carService.getIndividualCar(invalidCarId))
                .rejects
                .toThrow(CarService.getInvalidCarIdMsg(invalidCarId));
        });

        it('throw if the required car is not found', async () => {
            const { carService, carRepository } = getCarService();

            // Arrange
            jest.spyOn(carRepository, 'findOne')
                .mockImplementation(async () => Promise.resolve(null));

            // Act && Assert
            await expect(carService.getIndividualCar(carId))
                .rejects
                .toThrow(CarService.CarNotFoundMsg);
        });

        it('throw if the required car is not available', async () => {
            const { carService, carRepository } = getCarService();

            // Arrange
            jest.spyOn(carRepository, 'findOne')
                .mockImplementation(async () => Promise.resolve(getCar(false)));

            // Act && Assert
            await expect(carService.getIndividualCar(carId))
                .rejects
                .toThrow(CarService.CarIsNotAvailableMsg);
        });

    });

    describe('ObjectMapping', () => {

        it('mapToCarDTO() should exclude extra props', () => {
            // Arrange
            const inputObject = {
                id: carId,
                model: 'Series 1',
                class: 'A',
                price: 100,
                picture: 'string',
                isAvailable: true,
                brand: "BMW",
            };

            const expectedObject = {
                id: carId,
                model: 'Series 1',
                class: 'A',
                price: 100,
                picture: 'string',
                brand: "BMW",
            };

            // Act
            const result = CarService.mapToCarDTO(inputObject);

            // Assert
            expect(result).toEqual(expectedObject);
        });
    });
});
