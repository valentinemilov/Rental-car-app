import { TestingModule, Test } from '@nestjs/testing';

import { ContractController } from './contract.controller';
import { ContractService } from './contract.service';
import { CreateContractDTO } from './models/create-contract';
import { CloseContractDTO } from './models/close-contract';

describe('Contract Controller', () => {
    let controller: ContractController;
    const contractService = {
        createContract() { /* empty */ },
        getAllContracts() {/* empty */ },
        closeContract() {/* empty */ },
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ContractController],
            providers: [
                {
                    provide: ContractService,
                    useValue: contractService,
                },
            ],
        }).compile();

        controller = module.get<ContractController>(ContractController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('getContracts should return the result from contractService.getAllContracts()', async () => {
        // Arrange
        const mockResult = ['test', 'test2']
        const spy = jest.spyOn(contractService, 'getAllContracts').mockImplementation(async () => mockResult);

        // Act
        const output = await controller.getContracts();

        // Assert
        expect(output).toEqual(['test', 'test2']);

        spy.mockClear();
    });

    it('createContract should call contractService.createContract() with the correct arguments', async () => {
        // Arrange
        const id = '1';
        const body: CreateContractDTO = {
            firstName: 'test',
            lastName: 'test',
            age: 20,
            pickupDate: '2020-02-23 04:05',
            estimatedReturnDate: '2020-02-25 04:00'
        };
        const spy = jest.spyOn(contractService, 'createContract');

        // Act
        await controller.createContract(body, id);

        // Assert
        expect(contractService.createContract).toHaveBeenCalledTimes(1);
        expect(contractService.createContract).toHaveBeenCalledWith(body, id);

        spy.mockClear();
    });

    it('createContract should return the result from contractService.createContract()', async () => {
        // Arrange
        const id = '1';
        const body: CreateContractDTO = {
            firstName: 'test',
            lastName: 'test',
            age: 20,
            pickupDate: '2020-02-23 04:05',
            estimatedReturnDate: '2020-02-25 04:00'
        };
        const spy = jest.spyOn(contractService, 'createContract').mockImplementation(async () => 'test');

        // Act
        const output = await controller.createContract(body, id);

        // Assert
        expect(output).toBe('test');

        spy.mockClear();
    });

    it('closeContract should call contractService.closeContract() with the correct arguments', async () => {
        // Arrange
        const id = '1';
        const body: CloseContractDTO = { returnDate: '2020-02-23 04:05' };

        const spy = jest.spyOn(contractService, 'closeContract');

        // Act
        await controller.closeContract(body, id);

        // Assert
        expect(contractService.closeContract).toHaveBeenCalledTimes(1);
        expect(contractService.closeContract).toHaveBeenCalledWith(body, id);

        spy.mockClear();
    });

    it('closeContract should return the result from contractService.closeContract()', async () => {
        // Arrange
        const id = '1';
        const body: CloseContractDTO = { returnDate: '2020-02-23 04:05' };

        const spy = jest.spyOn(contractService, 'closeContract').mockImplementation(async () => 'test');

        // Act
        const output = await controller.closeContract(body, id);

        // Assert
        expect(output).toBe('test');

        spy.mockClear();
    });
});
