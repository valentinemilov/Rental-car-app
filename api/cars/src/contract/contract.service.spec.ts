import { TestingModule, Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { ContractService } from './contract.service';
import { Contract } from '../database/entities/contract.entity';
import { Car } from '../database/entities/car.entity';
import { ContractDTO } from './models/contract';

describe('ContractService', () => {
    let contractService: ContractService;
    const contractRepository = {
        create() {/* empty */ },
        find() { /* empty */ },
        findOne() { /* empty */ },
        save() { /* empty */ },
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
        // it('call the carRepository findOne() once with correct parametre', async () => {
        //     // Arrange
        //     const carId = '1';
        //     const contractMock = {
        //         firstName: 'test',
        //         lastName: 'test',
        //         age: 20,
        //         pickupDate: '2020-02-23 04:05',
        //         estimatedReturnDate: '2020-02-25 04:00'
        //     };

        //     const carMock = {
        //         id: '1',
        //         model: 'test',
        //         class: 1,
        //         price: 100,
        //         picture: 'string',
        //         isAvailable: true
        //     }

        //     const spyOnCarFindOne = jest.spyOn(carRepository, 'findOne')
        //         .mockImplementation(async () => carMock);

        //     // Act
        //     await contractService.createContract(contractMock, carId);

        //     // Assert
        //     expect(spyOnCarFindOne).toHaveBeenCalledTimes(1);
        //     expect(spyOnCarFindOne).toHaveBeenCalledWith(where:{ id: carId, isAvailable: true });

        //     spyOnCarFindOne.mockClear();
        // });

        it('throw if the required car is undefined', async () => {
            // Arrange
            const carId = '1';
            const contractMock = {
                firstName: 'test',
                lastName: 'test',
                age: 20,
                pickupDate: '2020-02-23 04:05',
                estimatedReturnDate: '2020-02-25 04:00'
            };

            const carMock = {
                id: '1',
                model: 'test',
                class: 1,
                price: 100,
                picture: 'string',
                isAvailable: true
            }

            const spyOnCarFindOne = jest.spyOn(carRepository, 'findOne')
                .mockImplementation(async () => undefined);

            // Act && Assert
            expect(contractService.createContract(contractMock, carId)).rejects.toThrow();
        });

        it('throw if the required car is not available', async () => {
            // Arrange
            const carId = '1';
            const contractMock = {
                firstName: 'test',
                lastName: 'test',
                age: 20,
                pickupDate: '2020-02-23 04:05',
                estimatedReturnDate: '2020-02-25 04:00'
            };

            const carMock = {
                id: '1',
                model: 'test',
                class: 1,
                price: 100,
                picture: 'string',
                isAvailable: false
            }

            const spyOnCarFindOne = jest.spyOn(carRepository, 'findOne')
                .mockImplementation(async () => carMock);

            // Act && Assert
            expect(contractService.createContract(contractMock, carId)).rejects.toThrow();
        });

        it('call the contractRepository create() once with correct parametre', async () => {
            // Arrange
            const carId = '1';
            const contractMock = {
                firstName: 'test',
                lastName: 'test',
                age: 20,
                pickupDate: '2020-02-23 04:05',
                estimatedReturnDate: '2020-02-25 04:00'
            };

            const spyOnCarFindOne = jest.spyOn(carRepository, 'findOne')
                .mockImplementation(async () => 'test');

            const spyOnCreate = jest.spyOn(contractRepository, 'create')
                .mockImplementation(async () => 'test');


            // Act
            await contractService.createContract(contractMock, carId);

            // Assert
            expect(spyOnCreate).toHaveBeenCalledTimes(1);
            expect(spyOnCreate).toHaveBeenCalledWith(contractMock);

            spyOnCreate.mockClear();
        });

        it('call the carRepository save() once with correct parametre', async () => {
            // Arrange
            const carId = '1';
            const contractMock = {
                firstName: 'test',
                lastName: 'test',
                age: 20,
                pickupDate: '2020-02-23 04:05',
                estimatedReturnDate: '2020-02-25 04:00'
            };

            const carMock = {
                id: '2',
                model: 'test',
                class: 1,
                price: 100,
                picture: 'string',
                isAvailable: false,
            }

            const spyOnCarFindOne = jest.spyOn(carRepository, 'findOne')
                .mockImplementation(async () => carMock);

            const spyOnCreate = jest.spyOn(contractRepository, 'create')
                .mockImplementation(async () => 'test');

            const spyOnCarSave = jest.spyOn(carRepository, 'save')
                .mockImplementation(async () => carMock);

            // Act
            await contractService.createContract(contractMock, carId);

            // Assert
            expect(spyOnCarSave).toHaveBeenCalledTimes(1);
            expect(spyOnCarSave).toHaveBeenCalledWith(carMock);

            spyOnCarSave.mockClear();
        });

        it('call the contractRepository save() once with correct parametre', async () => {
            // Arrange
            const carId = '1';
            const contractMock = {
                firstName: 'test',
                lastName: 'test',
                age: 20,
                pickupDate: '2020-02-23 04:05',
                estimatedReturnDate: '2020-02-25 04:00'
            };

            const carMock = {
                id: '2',
                model: 'test',
                class: 1,
                price: 100,
                picture: 'string',
                isAvailable: false,
            }

            const spyOnCarFindOne = jest.spyOn(carRepository, 'findOne')
                .mockImplementation(async () => carMock);

            const spyOnCarSave = jest.spyOn(carRepository, 'save')
                .mockImplementation(async () => carMock);

            const spyOnCreate = jest.spyOn(contractRepository, 'create')
                .mockImplementation(async () => 'test');

            const spyOnSave = jest.spyOn(contractRepository, 'save')
                .mockImplementation(async () => 'test');

            // Act
            await contractService.createContract(contractMock, carId);

            // Assert
            expect(spyOnSave).toHaveBeenCalledTimes(1);
            expect(spyOnSave).toHaveBeenCalledWith(contractMock);

            spyOnSave.mockClear();
        });

        // it('return transformed ContractDTO object', async () => {
        //     // Arrange
        //     const carId = '1';
        //     const contractMock = {
        //         firstName: 'test',
        //         lastName: 'test',
        //         age: 20,
        //         pickupDate: '2020-02-23 04:05',
        //         estimatedReturnDate: '2020-02-25 04:00'
        //     };

        //     const carMock = {
        //         id: '2',
        //         model: 'test',
        //         class: 1,
        //         price: 100,
        //         picture: 'string',
        //         isAvailable: false,
        //     }

        //     const spyOnCarFindOne = jest.spyOn(carRepository, 'findOne')
        //         .mockImplementation(async () => carMock);

        //     const spyOnCarSave = jest.spyOn(carRepository, 'save')
        //         .mockImplementation(async () => carMock);

        //     const spyOnCreate = jest.spyOn(contractRepository, 'create')
        //         .mockImplementation(async () => contractMock);

        //     const spyOnSave = jest.spyOn(contractRepository, 'save')
        //         .mockImplementation(async () => contractMock);

        //     const mockReturnedContract = {
        //         id: '2',
        //         firstName: 'test',
        //         lastName: 'test',
        //         age: 20,
        //         pickupDate: '2020-02-23 04:05',
        //         estimatedReturnDate: '2020-02-25 04:00'
        //     }

        //     // Act
        //     const result = await contractService.createContract(contractMock, carId);

        //     // Assert
        //     expect(result).toEqual(mockReturnedContract);
        // });

    })
});
