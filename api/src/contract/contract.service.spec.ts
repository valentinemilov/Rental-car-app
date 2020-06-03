/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Repository } from 'typeorm';

import { ContractService } from './contract.service';
import { Contract } from '../database/entities/contract.entity';
import { Car } from '../database/entities/car.entity';
import { ContractRepository } from '../database/repositories/ContractRepoitory';

const todayDate = new Date('2020-03-10T09:00:00.028Z');
const dateAfterToday = new Date('2020-03-11T09:00:00.028Z');
const dateBeforeToday = new Date('2020-03-08T09:00:00.028Z');

const carId = 'a1fd0475-aaaa-4f6b-b2b5-3e95034c96b4';
const classId = '491521f3-e3b8-45fe-bb8c-876a30f51ccb';

const getCar = (isAvailable = true): Car => {
    const result = {
        id: carId,
        model: 'Series 1',
        picture: 'string',
        isAvailable,
        brand: "BMW",
        carClass: {
            id: classId,
            class: 'A',
            price: 100,
            cars: [],
        },
        contracts: Promise.resolve([]),
    };

    return result;
};

const getContractRequest = (returnDate: Date = dateAfterToday) => ({
    firstName: 'test',
    lastName: 'test',
    age: 20,
    estimatedReturnDate: returnDate,
});

const contractId = '0e1b2ea4-28a0-4983-88d0-36cfb71f4c22';

const getContract = (isClosed = false): Contract => ({
    id: contractId,
    firstName: 'test',
    lastName: 'test',
    age: 20,
    pickupDate: todayDate,
    estimatedReturnDate: dateAfterToday,
    returnDate: null,
    isClosed,
    basePrice: 100,
    car: Promise.resolve({
        id: carId,
        model: 'test',
        picture: 'string',
        isAvailable: false,
        brand: 'BMW',
        carClass: {
            id: classId,
            class: 'A',
            price: 100,
            cars: [],
        },
        contracts: Promise.resolve([]),
    }),
});

const getContractService = (today: Date = todayDate) => {
    jest.mock("../database/repositories/ContractRepoitory");
    const contractRepo = new ContractRepository();
    // ContractRepository.prototype.persistBoth = jest.fn().mockReturnValue(Promise.resolve(5));
    jest.spyOn(contractRepo, 'persistBoth')
        .mockImplementation(async () => Promise.resolve());

    jest.spyOn(contractRepo, 'create')
        .mockImplementation(() => new Contract());

    jest.spyOn(contractRepo, 'findOne')
        .mockImplementation(async () => Promise.resolve(getContract()));

    const carRepo = new Repository<Car>();

    jest.spyOn(carRepo, 'findOne')
        .mockImplementation(async () => Promise.resolve(getCar()));

    const contractService = new ContractService(contractRepo, carRepo);
    jest.spyOn(contractService, 'getToday')
        .mockImplementation(() => today);

    return { contractService, carRepo, contractRepo };
};

describe('ContractService', () => {

    describe('ObjectMapping', () => {

        it("mapToContractDTO() should exclude extra props", () => {
            const inputObj = {
                id: 'bd1a9ef9-7484-40a1-b9b7-b9a5513e66a1',
                firstName: 'test',
                lastName: 'test',
                age: 20,
                pickupDate: new Date('2020-03-10T09:00:00.028Z'),
                estimatedReturnDate: new Date('2020-03-17T09:30:00'),
                basePrice: 100,
                returnDate: null,
                isClosed: false,
            };

            const expected = {
                id: 'bd1a9ef9-7484-40a1-b9b7-b9a5513e66a1',
                firstName: 'test',
                lastName: 'test',
                age: 20,
                pickupDate: new Date('2020-03-10T09:00:00.028Z'),
                estimatedReturnDate: new Date('2020-03-17T09:30:00'),
                basePrice: 100,
            };

            const result = ContractService.mapToContractDTO(inputObj);

            expect(result).toEqual(expected);
        });

        it("carMapper() should exclude extra props", () => {
            const inputObject = {
                id: 'db3ccdea-6cd6-477f-916f-cd19ef3b8bad',
                model: 'test',
                brand: "BMW",
                class: 'A',
                price: 100,
                picture: 'string',
                isAvailable: true,
                contracts: Promise.resolve([]),
            };

            const expectedObject = {
                model: 'test',
                brand: "BMW",
            };

            const result = ContractService.carMapper(inputObject);

            expect(result).toEqual(expectedObject);
        });

        it("mapToFinishedContractDTO() should exclude extra props", () => {
            const inputObj = {
                id: 'bd1a9ef9-7484-40a1-b9b7-b9a5513e66a1',
                firstName: 'test',
                lastName: 'test',
                age: 20,
                pickupDate: new Date('2020-03-10T09:00:00.028Z'),
                estimatedReturnDate: new Date('2020-03-17T09:30:00'),
                returnDate: new Date('2020-03-20T09:30:00'),
                isClosed: true,
            };

            const expected = {
                id: 'bd1a9ef9-7484-40a1-b9b7-b9a5513e66a1',
                firstName: 'test',
                lastName: 'test',
                age: 20,
                pickupDate: new Date('2020-03-10T09:00:00.028Z'),
                estimatedReturnDate: new Date('2020-03-17T09:30:00'),
                returnDate: new Date('2020-03-20T09:30:00'),
            };

            const result = ContractService.mapToFinishedContractDTO(inputObj);

            expect(result).toEqual(expected);
        });
    });

    describe('createContract() should', () => {

        it('call the carRepository findOne() once with correct parameter', async () => {
            const { carRepo, contractService } = getContractService();

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
                .toThrow(ContractService.getInvalidCarIdMsg(invalidCarID));
        });

        it('throw if the required car is not available', async () => {
            const { carRepo, contractService } = getContractService();

            // Arrange
            jest.spyOn(carRepo, 'findOne')
                .mockImplementation(async () => Promise.resolve(getCar(false)));

            // Act && Assert
            await expect(contractService.createContract(getContractRequest(), carId))
                .rejects
                .toThrow(ContractService.CarIsNotAvailableMsg);
        });

        it('throw if the required car is not found', async () => {
            const { carRepo, contractService } = getContractService();

            // Arrange
            jest.spyOn(carRepo, 'findOne')
                .mockImplementation(async () => Promise.resolve(null));

            // Act && Assert
            await expect(contractService.createContract(getContractRequest(), carId))
                .rejects
                .toThrow(ContractService.CarNotFoundMsg);
        });

        it('throw if return date is before today', async () => {
            const { contractService } = getContractService();

            // Arrange
            const contractRequest = getContractRequest(dateBeforeToday);

            // Act && Assert
            await expect(contractService.createContract(contractRequest, carId))
                .rejects
                .toThrow(ContractService.InvalidReturnDate);
        });
    });

    describe('closeContract() should', () => {

        it('call the contractRepository findOne() once with correct parametre', async () => {
            const { contractService, contractRepo } = getContractService();

            // Act
            await contractService.closeContract(contractId);

            // Assert
            const expectedoObject = {
                where: { id: contractId },
            };

            expect(contractRepo.findOne).toHaveBeenCalledTimes(1);
            expect(contractRepo.findOne).toHaveBeenCalledWith(expectedoObject);
        });

        it('throw if id is not unique identifier', async () => {
            const { contractService} = getContractService();

            // Arrange
            const invalidContractId = 'random string';

            // Act && Assert
            await expect(contractService.closeContract(invalidContractId))
                .rejects
                .toThrow(ContractService.getInvalidContractIdMsg(invalidContractId));
        });

        it('throw if the required contract is already closed', async () => {
            const { contractService, contractRepo } = getContractService();

            jest.spyOn(contractRepo, 'findOne')
                .mockImplementation(async () => Promise.resolve(getContract(true)));

            // Act && Assert
            await expect(contractService.closeContract(contractId))
                .rejects
                .toThrow(ContractService.ContractAlreadyClosedMsg);
        });

        it('throw if the required contract is not found', async () => {
            const { contractService, contractRepo } = getContractService();

            jest.spyOn(contractRepo, 'findOne')
                .mockImplementation(async () => Promise.resolve(null));

            // Act && Assert
            await expect(contractService.closeContract(contractId))
                .rejects
                .toThrow(ContractService.ContractNotFoundMsg);
        });
    });
});
