/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Repository } from 'typeorm';

import { ContractService } from './contract.service';
import { Contract } from '../database/entities/contract.entity';
import { Car } from '../database/entities/car.entity';
import { ContractRepository } from '../database/repositories/ContractRepoitory';
import { async } from 'rxjs/internal/scheduler/async';

const todayDate = new Date('2020-03-10T09:00:00.028Z');

const dateAfterToday = new Date('2020-03-11T09:00:00.028Z');

const dateBeforeToday = new Date('2020-03-08T09:00:00.028Z');

const carId = 'a1fd0475-aaaa-4f6b-b2b5-3e95034c96b4';

const getCar = (isAvailable: boolean = true): Car => {  const result = {
        id: carId,
        model: 'Series 1',
        class: 1,
        price: 100,
        picture: 'string',
        isAvailable,
        brand: "BMW",
        contracts: Promise.resolve([]),
    };
 return result;
}

const getContractRequest = (returnDate: Date = dateAfterToday) => ({
    firstName: 'test',
    lastName: 'test',
    age: 20,
    estimatedReturnDate: returnDate,
});

const getContractService = (today: Date = todayDate) => {
    const contractRepo = new ContractRepository();
    // ContractRepository.prototype.persistBoth = jest.fn().mockReturnValue(Promise.resolve(5));
    jest.spyOn(contractRepo, 'persistBoth')
        .mockImplementation(async () => Promise.resolve());

    jest.spyOn(contractRepo, 'create')
        .mockImplementation(() => new Contract())

    const carRepo = new Repository<Car>();

    jest.spyOn(carRepo, 'findOne')
        .mockImplementation(async () => Promise.resolve(getCar()));

    const contractService = new ContractService(contractRepo, carRepo);
    jest.spyOn(contractService, 'getToday')
        .mockImplementation(() => today);

    return { contractService, carRepo, contractRepo };
}



describe('ContractService', () => {

    describe('ObjectMapoing', () => {
        it("mapToContractDTO should exclude extra props", () => {
            const inputObj = {
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

            const expected = {
                id: 'bd1a9ef9-7484-40a1-b9b7-b9a5513e66a1',
                firstName: 'test',
                lastName: 'test',
                age: 20,
                pickupDate: new Date('2020-03-10T09:00:00.028Z'),
                estimatedReturnDate: new Date('2020-03-17T09:30:00'),
            };

            const result = ContractService.mapToContractDTO(inputObj);

            expect(result).toEqual(expected);
        });
    });

    describe('createContract() should', () => {
        it('call the carRepository findOne() once with correct parameter', async () => {
            jest.mock("../database/repositories/ContractRepoitory");

            const {carRepo, contractService } = getContractService();

            // Arrange
            const contractMock = getContractRequest(dateAfterToday);

            // Act
            await contractService.createContract(contractMock, carId);

            // Assert
            const expectedObject = {
                where: { id: carId },
            };
            expect(carRepo.findOne).toHaveBeenCalledTimes(1);
            expect(carRepo.findOne).toHaveBeenCalledWith(expectedObject);
        });

        it("throw if id is not unique identifier", async () => {
            const { contractService } = getContractService();
             
            const invalidCarID = "valid word";
            await expect(contractService.createContract(getContractRequest(), invalidCarID))
                .rejects
                .toThrow(ContractService.getInvalidCarIdMsg(invalidCarID))
        });

        it('throw if the required car is not available', async () => {
            jest.mock("../database/repositories/ContractRepoitory");

            const {carRepo, contractService } = getContractService();

            // Arrange
            jest.spyOn(carRepo, 'findOne')
                .mockImplementation(async () => Promise.resolve(getCar(false)));

            // Act && Assert
            await expect(contractService.createContract(getContractRequest(), carId))
            .rejects
            .toThrow(ContractService.CarIsNotAvailableMsg);
        });

        it('throw if the required car is not found', async () => {
            jest.mock("../database/repositories/ContractRepoitory");

            const {carRepo, contractService } = getContractService();

            // Arrange
            jest.spyOn(carRepo, 'findOne')
                .mockImplementation(async () => Promise.resolve(null));

            // Act && Assert
            await expect(contractService.createContract(getContractRequest(), carId))
            .rejects
            .toThrow(ContractService.CarNotFoundMsg);
        });

        it('throw if return date is before today', async () => {
            jest.mock("../database/repositories/ContractRepoitory");

            const { contractService } = getContractService();

            // Arrange
            const contractRequest = getContractRequest(dateBeforeToday);
            
            // Act && Assert
            await expect(contractService.createContract(contractRequest, carId))
            .rejects
            .toThrow(ContractService.CarNotFoundMsg);
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
