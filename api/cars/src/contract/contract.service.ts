/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager } from 'typeorm';

import { CreateContractDTO } from './models/create-contract';
import { Contract } from '../database/entities/contract.entity';
import { Car } from '../database/entities/car.entity';
import { ContractDTO } from './models/contract';
import { FinishedContractDTO } from './models/finished-contract';
import { AllContractsDTO } from './models/all-contracts';
import validateUniqueId from '../common/uuid-validation/uuid-validation';
import guard from '../common/guards/guard';
import isDateValid from '../common/date-validation/date-validation';
import { ContractRepository } from '../database/repositories/ContractRepoitory';

@Injectable()
export class ContractService {
    public constructor(
        private readonly contractRepository: ContractRepository,
        @InjectRepository(Car) private readonly carRepository: Repository<Car>,
    ) { }

    public async createContract(contract: CreateContractDTO, carId: string): Promise<ContractDTO> {
        guard.should(validateUniqueId(carId), `The provided id ${carId} is random string`);
        const foundCar: Car = await this.carRepository.findOne({
            where: {
                id: carId,
            },
        });

        guard.exists(foundCar, 'The car is not found');
        guard.exists(foundCar && foundCar.isAvailable, 'The car is not available');

        const pickupDate: Date = new Date();
        const isReturnDateValid: boolean = isDateValid(pickupDate, contract.estimatedReturnDate);
        guard.should(!isReturnDateValid, 'Return date is invalid');

        const contractEntity: Contract = this.contractRepository.create({ ...contract, pickupDate });

        foundCar.isAvailable = false;
        contractEntity.car = Promise.resolve(foundCar);

        await this.contractRepository.persistBoth(foundCar, contractEntity);

        return this.mapToContractDTO(contractEntity);
    }

    public async getAllContracts(): Promise<AllContractsDTO[]> {
        const allContracts: Contract[] = await this.contractRepository.find({
            where: {
                isClosed: false,
            },
            relations: ['car'],
        });

        const contractsToReturn = allContracts.map(async (contract: Contract) => {
            const tempContract = this.mapToContractDTO(contract);
            const carInContract: Car = await contract.car;
            const tempCar = this.carMapper(carInContract);

            return { ...tempContract, ...tempCar };
        });

        return await Promise.all(contractsToReturn);
    }

    public async closeContract(contractId: string): Promise<FinishedContractDTO> {
        guard.should(validateUniqueId(contractId), `The provided id ${contractId} is random string`);
        const foundContract: Contract = await this.contractRepository.findOne({
            where: { id: contractId },
        });

        guard.exists(foundContract, 'The contract is not found');
        guard.exists(foundContract && !foundContract.isClosed, 'The contract is already closed');

        const carToReturn: Car = await foundContract.car;
        carToReturn.isAvailable = true;

        const returnDate: Date = new Date();
        foundContract.returnDate = returnDate;
        foundContract.isClosed = true;

        await this.contractRepository.persistBoth(carToReturn, foundContract);

        return this.mapToFinishedContractDTO(foundContract);
    }

    private mapToContractDTO({ id, firstName, lastName, age, pickupDate, estimatedReturnDate }) {
        return { id, firstName, lastName, age, pickupDate, estimatedReturnDate };
    }

    private carMapper({ model, price }) {
        return { model, price };
    }

    private mapToFinishedContractDTO({ id, firstName, lastName, age, pickupDate, estimatedReturnDate, returnDate }) {
        return { id, firstName, lastName, age, pickupDate, estimatedReturnDate, returnDate };
    }
}
