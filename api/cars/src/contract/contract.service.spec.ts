/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Repository } from 'typeorm';

import { ContractService } from './contract.service';
import { Contract } from '../database/entities/contract.entity';
import { Car } from '../database/entities/car.entity';
import { ContractRepository } from '../database/repositories/ContractRepoitory';

describe('ContractService', () => {

    describe('createContract() should', () => {
        it('call the carRepository findOne() once with correct parametre', async () => {
            jest.mock("../database/repositories/ContractRepoitory");

            const contractRepo = new ContractRepository();
            // ContractRepository.prototype.persistBoth = jest.fn().mockReturnValue(Promise.resolve(5));
            jest.spyOn(contractRepo, 'persistBoth')
                .mockImplementation(async () => Promise.resolve());

            const carRepo = new Repository<Car>();
            const contractService = new ContractService(contractRepo, carRepo);

            const spyOnDate = jest.spyOn(contractService, 'getToday')
                .mockImplementation(() => new Date('2020-03-10T09:00:00.028Z'));

            // Arrange
            const carId = 'a1fd0475-aaaa-4f6b-b2b5-3e95034c96b4';
            const contractMock = {
                firstName: 'test',
                lastName: 'test',
                age: 20,
                estimatedReturnDate: new Date('2020-03-17T09:30:00'),
            };

            const carMock: Car = {
                id: carId,
                model: 'test',
                class: 1,
                price: 100,
                picture: 'string',
                isAvailable: true,
                contracts: Promise.resolve([]),
            };

            const expectedObject = {
                where: { id: carId },
            };

            jest.spyOn(carRepo, 'findOne')
                .mockImplementation(async () => Promise.resolve(carMock));

            jest.spyOn(contractRepo, 'create')
                .mockImplementation(() => new Contract());

            // Act
            await contractService.createContract(contractMock, carId);

            // Assert
            expect(carRepo.findOne).toHaveBeenCalledTimes(1);
            expect(carRepo.findOne).toHaveBeenCalledWith(expectedObject);

            spyOnDate.mockClear();
        });

        it('throw if the required car is not available', async () => {
            jest.mock("../database/repositories/ContractRepoitory");

            const contractRepository = new ContractRepository();

            jest.spyOn(contractRepository, 'persistBoth')
                .mockImplementation(async () => Promise.resolve());

            const carRepository = new Repository<Car>();
            const contractService = new ContractService(contractRepository, carRepository);

            // Arrange
            const carId = 'db3ccdea-6cd6-477f-916f-cd19ef3b8bad';
            const contractMock = {
                firstName: 'test',
                lastName: 'test',
                age: 20,
                estimatedReturnDate: new Date('2020-03-17T09:30:00'),
            };

            const carMock = {
                id: 'db3ccdea-6cd6-477f-916f-cd19ef3b8bad',
                model: 'test',
                class: 1,
                price: 100,
                picture: 'string',
                isAvailable: false,
                contracts: Promise.resolve([]),
            };

            jest.spyOn(carRepository, 'findOne')
                .mockImplementation(async () => Promise.resolve(carMock));

            // Act && Assert
            await expect(contractService.createContract(contractMock, carId)).rejects.toThrow('The car is not available');
        });

        it('call the contractRepository create() once with correct parametre', async () => {
            jest.mock("../database/repositories/ContractRepoitory");

            /*
            const _Date = Date;
            MockDate.UTC = _Date.UTC
            MockDate.parse = _Date.parse
            MockDate.now = () => expected.getTime()

            const mockDate = new Date('2020-03-10T09:00:00.028Z');
            global.Date.now = jest.fn(() =>  mockDate.getTime());
            */

            const contractRepository = new ContractRepository();

            jest.spyOn(contractRepository, 'persistBoth')
                .mockImplementation(async () => Promise.resolve());

            const carRepository = new Repository<Car>();
            const contractService = new ContractService(contractRepository, carRepository);

            const spyOnDate = jest.spyOn(contractService, 'getToday')
                .mockImplementation(() => new Date('2020-03-10T09:00:00.028Z'));

            // Arrange
            const carId = 'db3ccdea-6cd6-477f-916f-cd19ef3b8bad';
            const contractMock = {
                firstName: 'test',
                lastName: 'test',
                age: 20,
                estimatedReturnDate: new Date('2020-03-17T09:30:00'),
            };

            const carMock = {
                id: 'db3ccdea-6cd6-477f-916f-cd19ef3b8bad',
                model: 'test',
                class: 1,
                price: 100,
                picture: 'string',
                isAvailable: true,
                contracts: Promise.resolve([]),
            };

            const contractMockToCreate = {
                firstName: 'test',
                lastName: 'test',
                age: 20,
                estimatedReturnDate: new Date('2020-03-17T09:30:00'),
                pickupDate: new Date('2020-03-10T09:00:00.028Z'),
            };

            jest.spyOn(carRepository, 'findOne')
                .mockImplementation(async () => Promise.resolve(carMock));

            jest.spyOn(contractRepository, 'create')
                .mockImplementation(() => new Contract());


            // Act
            await contractService.createContract(contractMock, carId);

            // Assert
            expect(contractRepository.create).toHaveBeenCalledTimes(1);
            expect(contractRepository.create).toHaveBeenCalledWith(contractMockToCreate);

            spyOnDate.mockClear();
        });

        it('return transformed ContractDTO object', async () => {
            jest.mock("../database/repositories/ContractRepoitory");

            const contractRepository = new ContractRepository();

            jest.spyOn(contractRepository, 'persistBoth')
                .mockImplementation(async () => Promise.resolve());

            const carRepository = new Repository<Car>();
            const contractService = new ContractService(contractRepository, carRepository);

            const spyOnDate = jest.spyOn(contractService, 'getToday')
                .mockImplementation(() => new Date('2020-03-10T09:00:00.028Z'));

            // Arrange
            const carId = 'db3ccdea-6cd6-477f-916f-cd19ef3b8bad';
            const contractMock = {
                firstName: 'test',
                lastName: 'test',
                age: 20,
                estimatedReturnDate: new Date('2020-03-17T09:30:00'),
            };

            const carMock = {
                id: 'db3ccdea-6cd6-477f-916f-cd19ef3b8bad',
                model: 'test',
                class: 1,
                price: 100,
                picture: 'string',
                isAvailable: true,
                contracts: Promise.resolve([]),
            };

            const contractMockEntity = {
                id: 'bd1a9ef9-7484-40a1-b9b7-b9a5513e66a1',
                firstName: 'test',
                lastName: 'test',
                age: 20,
                pickupDate: new Date('2020-03-10T09:00:00.028Z'),
                estimatedReturnDate: new Date('2020-03-17T09:30:00'),
                returnDate: null,
                isClosed: false,
                car: Promise.resolve({
                    id: 'db3ccdea-6cd6-477f-916f-cd19ef3b8bad',
                    model: 'test',
                    class: 1,
                    price: 100,
                    picture: 'string',
                    isAvailable: true,
                    contracts: Promise.resolve([]),
                }),
            };

            jest.spyOn(carRepository, 'findOne')
                .mockImplementation(async () => Promise.resolve(carMock));

            jest.spyOn(contractRepository, 'create')
                .mockImplementation(() => contractMockEntity);

            const mockReturnedContract = {
                id: 'bd1a9ef9-7484-40a1-b9b7-b9a5513e66a1',
                firstName: 'test',
                lastName: 'test',
                age: 20,
                pickupDate: new Date('2020-03-10T09:00:00.028Z'),
                estimatedReturnDate: new Date('2020-03-17T09:30:00'),
            };

            // Act
            const result = await contractService.createContract(contractMock, carId);

            // Assert
            expect(result).toEqual(mockReturnedContract);

            spyOnDate.mockClear();
        });
    });

    describe('getAllContracts() should', () => {
        it('call the contractRepository find() once with correct parametre', async () => {
            jest.mock("../database/repositories/ContractRepoitory");

            const contractRepository = new ContractRepository();

            jest.spyOn(contractRepository, 'persistBoth')
                .mockImplementation(async () => Promise.resolve());

            const carRepository = new Repository<Car>();
            const contractService = new ContractService(contractRepository, carRepository);

            // Arrange
            const expectedoObject = {
                where: {
                    isClosed: false,
                },
                relations: ['car'],
            };

            jest.spyOn(contractRepository, 'find')
                .mockImplementation(async () => []);

            // Act
            await contractService.getAllContracts();

            // Assert
            expect(contractRepository.find).toHaveBeenCalledTimes(1);
            expect(contractRepository.find).toHaveBeenCalledWith(expectedoObject);

        });

        it('return an array of mapped objects AllContractsDTO[] ', async () => {
            jest.mock("../database/repositories/ContractRepoitory");

            const contractRepository = new ContractRepository();

            jest.spyOn(contractRepository, 'persistBoth')
                .mockImplementation(async () => Promise.resolve());

            const carRepository = new Repository<Car>();
            const contractService = new ContractService(contractRepository, carRepository);

            const spyOnDate = jest.spyOn(contractService, 'getToday')
                .mockImplementation(() => new Date('2020-03-10T09:00:00.028Z'));

            // Arrange
            const contractMockEntity = {
                id: 'bd1a9ef9-7484-40a1-b9b7-b9a5513e66a1',
                firstName: 'test',
                lastName: 'test',
                age: 20,
                pickupDate: new Date('2020-03-10T09:00:00.028Z'),
                estimatedReturnDate: new Date('2020-03-17T09:30:00'),
                returnDate: null,
                isClosed: false,
                car: Promise.resolve({
                    id: 'db3ccdea-6cd6-477f-916f-cd19ef3b8bad',
                    model: 'test',
                    class: 1,
                    price: 100,
                    picture: 'string',
                    isAvailable: true,
                    contracts: Promise.resolve([]),
                }),
            };

            const mappedMockContract = {
                id: 'bd1a9ef9-7484-40a1-b9b7-b9a5513e66a1',
                firstName: 'test',
                lastName: 'test',
                age: 20,
                pickupDate: new Date('2020-03-10T09:00:00.028Z'),
                estimatedReturnDate: new Date('2020-03-17T09:30:00'),
                model: 'test',
                price: 100,
            };

            jest.spyOn(contractRepository, 'find')
                .mockImplementation(async () => [contractMockEntity]);

            // Act
            const result = await contractService.getAllContracts();

            // Assert
            expect(result.length).toBe(1);
            expect(result[0]).toEqual(mappedMockContract);

            spyOnDate.mockClear();
        });
    });

    describe('closeContract() should', () => {
        it('call the contractRepository findOne() once with correct parametre', async () => {
            jest.mock("../database/repositories/ContractRepoitory");

            const contractRepository = new ContractRepository();

            jest.spyOn(contractRepository, 'persistBoth')
                .mockImplementation(async () => Promise.resolve());

            const carRepository = new Repository<Car>();
            const contractService = new ContractService(contractRepository, carRepository);

            const spyOnDate = jest.spyOn(contractService, 'getToday')
                .mockImplementation(() => new Date('2020-03-10T09:00:00.028Z'));

            const contractId = '0e1b2ea4-28a0-4983-88d0-36cfb71f4c22';
            const contractMock = {
                id: contractId,
                firstName: 'test',
                lastName: 'test',
                age: 20,
                pickupDate: new Date('2020-02-23 04:05'),
                estimatedReturnDate: new Date('2020-03-17T09:30:00'),
                returnDate: null,
                isClosed: false,
                car: Promise.resolve({
                    id: 'db3ccdea-6cd6-477f-916f-cd19ef3b8bad',
                    model: 'test',
                    class: 1,
                    price: 100,
                    picture: 'string',
                    isAvailable: true,
                    contracts: Promise.resolve([]),
                }),
            };
            const expectedoObject = {
                where: { id: contractId },
            };

            jest.spyOn(contractRepository, 'findOne')
                .mockImplementation(async () => Promise.resolve(contractMock));

            // Act
            await contractService.closeContract(contractId);

            // Assert
            expect(contractRepository.findOne).toHaveBeenCalledTimes(1);
            expect(contractRepository.findOne).toHaveBeenCalledWith(expectedoObject);

            spyOnDate.mockClear();
        });

        // it('throw if the required contract is already closed', async () => {
        //     jest.mock("../database/repositories/ContractRepoitory");

        //     const contractRepository = new ContractRepository();

        //     jest.spyOn(contractRepository, 'persistBoth')
        //         .mockImplementation(async () => Promise.resolve());

        //     const carRepository = new Repository<Car>();
        //     const contractService = new ContractService(contractRepository, carRepository);

        //     const contractId = '08e289b7-f07e-4b86-8fbf-1d3830ce5ed9';
        //     const contractMock = {
        //         id: contractId,
        //         firstName: 'test',
        //         lastName: 'test',
        //         age: 20,
        //         pickupDate: new Date('2020-03-02T09:00:00.028Z'),
        //         estimatedReturnDate: new Date('2020-03-05T09:00:00.028Z'),
        //         returnDate: null,
        //         isClosed: true,
        //         car: null,
        //     };

        //     jest.spyOn(contractRepository, 'findOne')
        //         .mockImplementation(async () => Promise.resolve(contractMock));

        //     // Act && Assert
        //     await expect(contractService.closeContract(contractId)).rejects.toThrow('The contract is alraeay closed');
        // });

        it('return mapped FinishedContractDTO', async () => {

            jest.mock("../database/repositories/ContractRepoitory");

            const contractRepository = new ContractRepository();

            jest.spyOn(contractRepository, 'persistBoth')
                .mockImplementation(async () => Promise.resolve());

            const carRepository = new Repository<Car>();
            const contractService = new ContractService(contractRepository, carRepository);

            const spyOnDate = jest.spyOn(contractService, 'getToday')
                .mockImplementation(() => new Date('2020-03-10T09:00:00.028Z'));

            const contractId = '08e289b7-f07e-4b86-8fbf-1d3830ce5ed9';

            const contractMock = {
                id: contractId,
                firstName: 'test',
                lastName: 'test',
                age: 20,
                pickupDate: new Date('2020-03-05T09:00:00.028Z'),
                estimatedReturnDate: new Date('2020-03-11T09:00:00.028Z'),
                returnDate: new Date('2020-03-10T09:00:00.028Z'),
                isClosed: false,
                car: Promise.resolve({
                    id: 'db3ccdea-6cd6-477f-916f-cd19ef3b8bad',
                    model: 'test',
                    class: 1,
                    price: 100,
                    picture: 'string',
                    isAvailable: true,
                    contracts: Promise.resolve([]),
                }),
            };

            jest.spyOn(contractRepository, 'findOne')
                .mockImplementation(async () => contractMock);

            const finishedContractMock = {
                id: contractId,
                firstName: 'test',
                lastName: 'test',
                age: 20,
                pickupDate: new Date('2020-03-05T09:00:00.028Z'),
                estimatedReturnDate: new Date('2020-03-11T09:00:00.028Z'),
                returnDate: new Date('2020-03-10T09:00:00.028Z'),
            };

            // Act
            const result = await contractService.closeContract(contractId);

            // Assert
            expect(result).toEqual(finishedContractMock);

            spyOnDate.mockClear();
        });
    });
});
