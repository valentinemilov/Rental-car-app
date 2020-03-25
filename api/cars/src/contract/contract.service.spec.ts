import { TestingModule, Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { ContractService } from './contract.service';
import { Contract } from '../database/entities/contract.entity';
import { Car } from '../database/entities/car.entity';
import { ContractDTO } from './models/contract';
import { FinishedContractDTO } from './models/finished-contract';

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

        //     const expectedoObject = {
        //         where: {
        //             id: carId,
        //             isAvailable: true,
        //         }
        //     };

        //     const spyOnCarFindOne = jest.spyOn(carRepository, 'findOne')
        //         .mockImplementation(async () => 'test');

        //     const spyOnCarSave = jest.spyOn(carRepository, 'save')
        //         .mockImplementation(async () => 'test');

        //     // const spyOnCreate = jest.spyOn(contractRepository, 'create')
        //     //     .mockImplementation(async () => 'test');

        //     // const spyOnSave = jest.spyOn(contractRepository, 'save')
        //     //     .mockImplementation(async () => 'test');

        //     // Act
        //     await contractService.createContract(contractMock, carId);

        //     // Assert
        //     expect(carRepository.findOne).toHaveBeenCalledTimes(1);
        //     expect(carRepository.findOne).toHaveBeenCalledWith(expectedoObject);

        //     spyOnCarFindOne.mockClear();
        //     // spyOnCreate.mockClear();
        //     spyOnCarSave.mockClear();
        //     // spyOnSave.mockClear();
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
            expect(contractRepository.create).toHaveBeenCalledTimes(1);
            expect(contractRepository.create).toHaveBeenCalledWith(contractMock);

            spyOnCreate.mockClear();
            spyOnCarFindOne.mockClear();
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
                id: carId,
                model: 'test',
                class: 1,
                price: 100,
                picture: 'string',
                isAvailable: true,
            }

            const spyOnCarFindOne = jest.spyOn(carRepository, 'findOne')
                .mockImplementation(async () => carMock);

            const spyOnCreate = jest.spyOn(contractRepository, 'create')
                .mockImplementation(async () => 'test');

            const spyOnCarSave = jest.spyOn(carRepository, 'save')
                .mockImplementation(async () => 'test');

            // Act
            await contractService.createContract(contractMock, carId);

            // Assert
            expect(carRepository.save).toHaveBeenCalledTimes(1);
            expect(carRepository.save).toHaveBeenCalledWith({ ...carMock, isAvailable: false });

            spyOnCarSave.mockClear();
            spyOnCarFindOne.mockClear()
            spyOnCreate.mockClear()
        });

        // it('call the contractRepository save() once with correct parametre', async () => {
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

        //     const contractMockEntity = {
        //         id: null,
        //         firstName: 'test',
        //         lastName: 'test',
        //         age: 20,
        //         pickupDate: '2020-02-23 04:05',
        //         estimatedReturnDate: '2020-02-25 04:00',
        //         returnDate: null,
        //         isClosed: false,
        //         car: carMock
        //     };

        //     const spyOnCarFindOne = jest.spyOn(carRepository, 'findOne')
        //         .mockImplementation(async () => carMock);

        //     const spyOnCarSave = jest.spyOn(carRepository, 'save')
        //         .mockImplementation(async () => carMock);

        //     const spyOnCreate = jest.spyOn(contractRepository, 'create')
        //         .mockImplementation(async () => contractMockEntity);

        //     const spyOnSave = jest.spyOn(contractRepository, 'save')
        //         .mockImplementation(async () => 'test');

        //     // Act
        //     await contractService.createContract(contractMock, carId);

        //     // Assert
        //     expect(contractRepository.save).toHaveBeenCalledTimes(1);
        //     expect(contractRepository.save).toHaveBeenCalledWith(contractMockEntity);

        //     spyOnCarFindOne.mockClear();
        //     spyOnCarSave.mockClear();
        //     spyOnCreate.mockClear();
        //     spyOnSave.mockClear();
        // });

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
        //         id: carId,
        //         model: 'test',
        //         class: 1,
        //         price: 100,
        //         picture: 'string',
        //         isAvailable: false,
        //     }

        //     const contractMockEntity = {
        //         id: '2',
        //         firstName: 'test',
        //         lastName: 'test',
        //         age: 20,
        //         pickupDate: '2020-02-23 04:05',
        //         estimatedReturnDate: '2020-02-25 04:00',
        //         returnDate: null,
        //         isClosed: false,
        //     };

        //     const spyOnCarFindOne = jest.spyOn(carRepository, 'findOne')
        //         .mockImplementation(async () => carMock);

        //     const spyOnCarSave = jest.spyOn(carRepository, 'save')
        //         .mockImplementation(async () => carMock);

        //     const spyOnCreate = jest.spyOn(contractRepository, 'create')
        //         .mockImplementation(async () => contractMockEntity);

        //     const spyOnSave = jest.spyOn(contractRepository, 'save')
        //         .mockImplementation(async () => contractMockEntity);

        //     const mockReturnedContract: ContractDTO = {
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

        //     spyOnCarFindOne.mockClear();
        //     spyOnCarSave.mockClear();
        //     spyOnCreate.mockClear();
        //     spyOnSave.mockClear();
        // });
    })

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

        // it('return the correct result', async () => {
        //     // Arrange
        //     const spyOnFind = jest.spyOn(contractRepository, 'find')
        //         .mockImplementation(async () => ['test', 'test1']);

        //     // Act
        //     const result = await contractService.getAllContracts();

        //     // Assert
        //     expect(result.length).toEqual(2);
        //     expect(result[0]).toEqual('test');
        //     expect(result[1]).toEqual('test1');

        //     spyOnFind.mockClear();
        // });
    });

    describe('closeContract() should', () => {
        it('call the contractRepository findOne() once with correct parametre', async () => {
            const contractId = '123';
            const mockDate = {
                returnDate: '2020-02-27 04:05'
            };

            const expectedoObject = {
                where: {
                    id: contractId,
                    isClosed: false,
                }
            };

            const spyOnCarSave = jest.spyOn(carRepository, 'save')
                .mockImplementation(async () => 'test');

            const spyOnSave = jest.spyOn(contractRepository, 'save')
                .mockImplementation(async () => 'test');

            const spyOnFindOne = jest.spyOn(contractRepository, 'findOne')
                .mockImplementation(async () => 'test');

            // Act
            await contractService.closeContract(mockDate, contractId);

            // Assert
            expect(contractRepository.findOne).toHaveBeenCalledTimes(1);
            expect(contractRepository.findOne).toHaveBeenCalledWith(expectedoObject);

            spyOnFindOne.mockClear();
        });

        it('throw if the required contract is undefined', async () => {
            const contractId = '123';
            const mockDate = {
                returnDate: '2020-02-27 04:05'
            };

            const expectedoObject = {
                where: {
                    id: contractId,
                    isClosed: false,
                }
            };

            const spyOnCarSave = jest.spyOn(carRepository, 'save')
                .mockImplementation(async () => 'test');

            const spyOnSave = jest.spyOn(contractRepository, 'save')
                .mockImplementation(async () => 'test');

            const spyOnFindOne = jest.spyOn(contractRepository, 'findOne')
                .mockImplementation(async () => undefined);

            // Act && Assert
            expect(contractService.closeContract(mockDate, contractId)).rejects.toThrow();
        });

        // it('call the carRepository save() once with correct parametre', async () => {
        //     const contractId = '123';
        //     const mockDate = {
        //         returnDate: '2020-02-27 04:05'
        //     };

        //     const carMock = {
        //         id: '1',
        //         model: 'test',
        //         class: 2,
        //         price: 10,
        //         picture: 'test1',
        //         isAvailable: false,
        //     }

        //     const spyOnCarSave = jest.spyOn(carRepository, 'save')
        //         .mockImplementation(async () => carMock);

        //     const spyOnSave = jest.spyOn(contractRepository, 'save')
        //         .mockImplementation(async () => 'test');

        //     const spyOnFindOne = jest.spyOn(contractRepository, 'findOne')
        //         .mockImplementation(async () => 'test');

        //     // Act
        //     await contractService.closeContract(mockDate, contractId);

        //     // Assert
        //     expect(carRepository.save).toHaveBeenCalledTimes(1);
        //     expect(carRepository.save).toHaveBeenCalledWith({ ...carMock, isAvailable: true });

        //     spyOnCarSave.mockClear();
        //     spyOnSave.mockClear();
        //     spyOnFindOne.mockClear();
        // });

        it('call the contractRepository save() once with correct parametre', async () => {
            const contractId = '123';
            const mockDate = {
                returnDate: '2020-02-27 04:05'
            };

            const contractMock = {
                id: contractId,
                firstName: 'test',
                lastName: 'test',
                age: 20,
                pickupDate: '2020-02-23 04:05',
                estimatedReturnDate: '2020-02-25 04:00',
                returnDate: null,
                isClosed: false,
            };

            const spyOnCarSave = jest.spyOn(carRepository, 'save')
                .mockImplementation(async () => 'test');

            const spyOnSave = jest.spyOn(contractRepository, 'save')
                .mockImplementation(async () => 'test');

            const spyOnFindOne = jest.spyOn(contractRepository, 'findOne')
                .mockImplementation(async () => contractMock);

            // Act
            await contractService.closeContract(mockDate, contractId);

            // Assert
            expect(contractRepository.save).toHaveBeenCalledWith({
                ...contractMock,
                returnDate: mockDate.returnDate,
                isClosed: true,
            });

            spyOnSave.mockClear();
            spyOnCarSave.mockClear();
            spyOnFindOne.mockClear();
        });

        it('return transformed FinishedContractDTO', async () => {
            const contractId = '123';
            const mockDate = {
                returnDate: '2020-02-27 04:05'
            };

            const contractMock = {
                id: contractId,
                firstName: 'test',
                lastName: 'test',
                age: 20,
                pickupDate: '2020-02-23 04:05',
                estimatedReturnDate: '2020-02-25 04:00',
                returnDate: mockDate.returnDate,
                isClosed: false,
            };

            const spyOnCarSave = jest.spyOn(carRepository, 'save')
                .mockImplementation(async () => 'test');

            const spyOnSave = jest.spyOn(contractRepository, 'save')
                .mockImplementation(async () => contractMock);

            const spyOnFindOne = jest.spyOn(contractRepository, 'findOne')
                .mockImplementation(async () => 'test');

            const finishedContractMock = {
                id: contractId,
                firstName: 'test',
                lastName: 'test',
                age: 20,
                pickupDate: '2020-02-23 04:05',
                estimatedReturnDate: '2020-02-25 04:00',
                returnDate: mockDate.returnDate,
            }

            // Act
            const result = await contractService.closeContract(mockDate, contractId);

            // Assert
            expect(result).toEqual(finishedContractMock);
        });
    });
});
