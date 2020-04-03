/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { TestingModule, Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { ContractService } from './contract.service';
import { Contract } from '../database/entities/contract.entity';
import { Car } from '../database/entities/car.entity';
import guard from '../common/guards/guard';
import { ContractRepository } from '../database/repositories/ContractRepoitory';
import { Repository } from 'typeorm';

describe('ContractService', () => {
    let contractService: ContractService;
    const contractRepository = {
        create() {/* empty */ },
        find() { /* empty */ },
        findOne() { /* empty */ },
        save() { /* empty */ },
        persistBoth() { },
    };

    const carRepository = {
        findOne() { /* empty */ },
        save() { /* empty */ },
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ContractService,
                {
                    provide: getRepositoryToken(Contract),
                    useValue: contractRepository,
                },
                {
                    provide: getRepositoryToken(Car),
                    useValue: carRepository,
                },
            ],
        }).compile();

        contractService = module.get<ContractService>(ContractService);
    });

    it('should be defined', () => {
        expect(contractService).toBeDefined();
    });

    describe('createContract() should', () => {
        it('call the carRepository findOne() once with correct parametre', async () => {
            jest.mock("../database/repositories/ContractRepoitory");

            const contractRepo = new ContractRepository();
            ContractRepository.prototype.persistBoth = jest.fn().mockReturnValue(Promise.resolve(5));
            const carRepo = new Repository<Car>();

            const contractService = new ContractService(contractRepo, carRepo);

            const spyDate = jest
                .spyOn(global, 'Date')
                .mockImplementation(() => '2020-03-15T09:30:00');

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

            const spyOnCarFindOne = jest.spyOn(carRepo, 'findOne')
                .mockImplementation(async () => Promise.resolve(carMock));

            const spyOnCreate = jest.spyOn(contractRepo, 'create')
                .mockImplementation(() => new Contract());

            // Act
            await contractService.createContract(contractMock, carId);

            // Assert
            expect(carRepo.findOne).toHaveBeenCalledTimes(1);
            expect(carRepo.findOne).toHaveBeenCalledWith(expectedObject);

            spyDate.mockClear();
        });

        it('throw if the required car is undefined', async () => {
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
            };

            const spyOnCarFindOne = jest.spyOn(carRepository, 'findOne')
                .mockImplementation(async () => undefined);

            // Act && Assert
            expect(contractService.createContract(contractMock, carId)).rejects.toThrow();
        });

        it('throw if the required car is not available', async () => {
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
            };

            const spyOnCarFindOne = jest.spyOn(carRepository, 'findOne')
                .mockImplementation(async () => carMock);

            // Act && Assert
            expect(contractService.createContract(contractMock, carId)).rejects.toThrow();
        });

        // it('call the contractRepository create() once with correct parametre', async () => {
        //     // Arrange
        //     const carId = 'db3ccdea-6cd6-477f-916f-cd19ef3b8bad';
        //     const contractMock = {
        //         firstName: 'test',
        //         lastName: 'test',
        //         age: 20,
        //         estimatedReturnDate: new Date('2020-03-17T09:30:00'),
        //     };

        //     const carMock = {
        //         id: 'db3ccdea-6cd6-477f-916f-cd19ef3b8bad',
        //         model: 'test',
        //         class: 1,
        //         price: 100,
        //         picture: 'string',
        //         isAvailable: true,
        //     };

        //     const contractMockToCreate = {
        //         firstName: 'test',
        //         lastName: 'test',
        //         age: 20,
        //         pickupDate: new Date('2020-02-23 04:05'),
        //         estimatedReturnDate: new Date('2020-03-17T09:30:00'),
        //     };

        //     const spyOnCarFindOne = jest.spyOn(carRepository, 'findOne')
        //         .mockImplementation(async () => carMock);

        //     const spyOnCreate = jest.spyOn(contractRepository, 'create')
        //         .mockImplementation(async () => 'test');

        //     const spyOnGuardExist = jest.spyOn(guard, 'exists')
        //         .mockImplementation(async () => true);
        //     const spyOnGuardShould = jest.spyOn(guard, 'should')
        //         .mockImplementation(async () => true);

        //     // Act
        //     await contractService.createContract(contractMock, carId);

        //     // Assert
        //     expect(contractRepository.create).toHaveBeenCalledTimes(1);
        //     expect(contractRepository.create).toHaveBeenCalledWith(contractMockToCreate);

        //     spyOnCreate.mockClear();
        //     spyOnCarFindOne.mockClear();
        //     spyOnGuardExist.mockClear();
        //     spyOnGuardShould.mockClear();
        // });

        // it('return transformed ContractDTO object', async () => {
        //     // Arrange
        //     const carId = '1';
        //     const contractMock = {
        //         firstName: 'test',
        //         lastName: 'test',
        //         age: 20,
        //         estimatedReturnDate: new Date('2020-03-17T09:30:00'),
        //     };

        //     const carMock = {
        //         id: carId,
        //         model: 'test',
        //         class: 1,
        //         price: 100,
        //         picture: 'string',
        //         isAvailable: false,
        //     };

        //     const contractMockEntity = {
        //         id: '2',
        //         firstName: 'test',
        //         lastName: 'test',
        //         age: 20,
        //         pickupDate: new Date('2020-02-23 04:05'),
        //         estimatedReturnDate: new Date('2020-03-17T09:30:00'),
        //         returnDate: null,
        //         isClosed: false,
        //     };

        //     const spyOnCarFindOne = jest.spyOn(carRepository, 'findOne')
        //         .mockImplementation(async () => carMock);

        //     const spyOnCreate = jest.spyOn(contractRepository, 'create')
        //         .mockImplementation(async () => contractMockEntity);

        //     const spyOnGuardExist = jest.spyOn(guard, 'exists')
        //         .mockImplementation(async () => true);
        //     const spyOnGuardShould = jest.spyOn(guard, 'should')
        //         .mockImplementation(async () => true);

        //     const mockReturnedContract = {
        //         id: '2',
        //         firstName: 'test',
        //         lastName: 'test',
        //         age: 20,
        //         pickupDate: new Date('2020-02-23 04:05'),
        //         estimatedReturnDate: new Date('2020-03-17T09:30:00'),
        //     };

        //     // Act
        //     const result = await contractService.createContract(contractMock, carId);

        //     // Assert
        //     expect(result).toEqual(mockReturnedContract);

        //     spyOnCarFindOne.mockClear();
        //     spyOnGuardExist.mockClear();
        //     spyOnCreate.mockClear();
        //     spyOnGuardShould.mockClear();
        // });
    });

    describe('getAllContracts() should', () => {
        it('call the contractRepository find() once with correct parametre', async () => {
            // Arrange
            const expectedoObject = {
                where: {
                    isClosed: false,
                },
                relations: ['car'],
            };

            const spyOnFind = jest.spyOn(contractRepository, 'find')
                .mockImplementation(async () => []);

            // Act
            await contractService.getAllContracts();

            // Assert
            expect(contractRepository.find).toHaveBeenCalledTimes(1);
            expect(contractRepository.find).toHaveBeenCalledWith(expectedoObject);

            spyOnFind.mockClear();
        });

        it('return the correct result', async () => {
            // Arrange
            const contractMockOne = {
                id: '2',
                firstName: 'test',
                lastName: 'test',
                age: 20,
                pickupDate: new Date('2020-02-23 04:05'),
                estimatedReturnDate: new Date('2020-03-17T09:30:00'),
                returnDate: null,
                isClosed: false,
                car: {
                    id: '5',
                    model: 'test',
                    class: 1,
                    price: 100,
                    picture: 'string',
                    isAvailable: false,
                },
            };

            const output = {
                id: '2',
                firstName: 'test',
                lastName: 'test',
                age: 20,
                pickupDate: new Date('2020-02-23 04:05'),
                estimatedReturnDate: new Date('2020-03-17T09:30:00'),
                model: 'test',
                price: 100,
            };

            const spyOnFind = jest.spyOn(contractRepository, 'find')
                .mockImplementation(async () => [contractMockOne]);

            // Act
            const result = await contractService.getAllContracts();

            // Assert
            expect(result.length).toBe(1);
            spyOnFind.mockClear();
        });
    });

    describe('closeContract() should', () => {
        // it('call the contractRepository findOne() once with correct parametre', async () => {
        //     const contractId = '2';
        //     const contractMock = {
        //         id: '2',
        //         firstName: 'test',
        //         lastName: 'test',
        //         age: 20,
        //         pickupDate: new Date('2020-02-23 04:05'),
        //         estimatedReturnDate: new Date('2020-03-17T09:30:00'),
        //         returnDate: null,
        //         isClosed: false,
        //         car: {
        //             id: '5',
        //             model: 'test',
        //             class: 1,
        //             price: 100,
        //             picture: 'string',
        //             isAvailable: false,
        //         },
        //     };
        //     const expectedoObject = {
        //         where: { id: contractId },
        //     };

        //     const spyOnFindOne = jest.spyOn(contractRepository, 'findOne')
        //         .mockImplementation(async () => contractMock);

        //     const spyOnGuardExist = jest.spyOn(guard, 'exists')
        //         .mockImplementation(async () => true);
        //     const spyOnGuardShould = jest.spyOn(guard, 'should')
        //         .mockImplementation(async () => true);

        //     // Act
        //     await contractService.closeContract(contractId);

        //     // Assert
        //     expect(contractRepository.findOne).toHaveBeenCalledTimes(1);
        //     expect(contractRepository.findOne).toHaveBeenCalledWith(expectedoObject);

        //     spyOnFindOne.mockClear();
        //     spyOnGuardExist.mockClear();
        //     spyOnGuardShould.mockClear();
        // });

        it('throw if the required contract is undefined', async () => {
            const contractId = '08e289b7-f07e-4b86-8fbf-1d3830ce5ed9';
            const expectedoObject = {
                where: { isClosed: false },
            };

            const spyOnCarSave = jest.spyOn(carRepository, 'save')
                .mockImplementation(async () => 'test');

            const spyOnSave = jest.spyOn(contractRepository, 'save')
                .mockImplementation(async () => 'test');

            const spyOnFindOne = jest.spyOn(contractRepository, 'findOne')
                .mockImplementation(async () => undefined);

            // Act && Assert
            expect(contractService.closeContract(contractId)).rejects.toThrow();
        });

        // it('return transformed FinishedContractDTO', async () => {
        //     const contractId = '10';
        //     const mockDate = { returnDate: new Date('2020-03-25T09:30:00') };

        //     const contractMock = {
        //         id: contractId,
        //         firstName: 'test',
        //         lastName: 'test',
        //         age: 20,
        //         pickupDate: new Date('2020-03-15T09:30:00'),
        //         estimatedReturnDate: new Date('2020-03-20T09:30:00'),
        //         returnDate: null,
        //         isClosed: false,
        //         car: {
        //             id: '5',
        //             model: 'test',
        //             class: 1,
        //             price: 100,
        //             picture: 'string',
        //             isAvailable: false,
        //         },
        //     };

        //     const spyOnFindOne = jest.spyOn(contractRepository, 'findOne')
        //         .mockImplementation(async () => contractMock);

        //     const spyOnGuardExist = jest.spyOn(guard, 'exists')
        //         .mockImplementation(async () => true);
        //     const spyOnGuardShould = jest.spyOn(guard, 'should')
        //         .mockImplementation(async () => true);

        //     const finishedContractMock = {
        //         id: contractId,
        //         firstName: 'test',
        //         lastName: 'test',
        //         age: 20,
        //         pickupDate: new Date('2020-03-15T09:30:00'),
        //         estimatedReturnDate: new Date('2020-03-20T09:30:00'),
        //         returnDate: mockDate.returnDate,
        //     };

        //     // Act
        //     const result = await contractService.closeContract(contractId);

        //     // Assert
        //     expect(result).toEqual(finishedContractMock);

        //     spyOnFindOne.mockClear();
        //     spyOnGuardExist.mockClear();
        //     spyOnGuardShould.mockClear();
        // });
    });
});
