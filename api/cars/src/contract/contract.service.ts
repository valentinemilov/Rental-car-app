/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateContractDTO } from './models/create-contract';
import { Contract } from '../database/entities/contract.entity';
import { Car } from '../database/entities/car.entity';
import { ContractDTO } from './models/contract';
import { FinishedContractDTO } from './models/finished-contract';
import { AllContractsDTO } from './models/all-contracts';
import validateUniqueId from '../common/uuid-validation/uuid-validation';
import guard from '../common/guards/guard';
import isDateValid from '../common/date-validation/date-validation';

@Injectable()
export class ContractService {
    public constructor(
        @InjectRepository(Contract) private readonly contractRepository: Repository<Contract>,
        @InjectRepository(Car) private readonly carRepository: Repository<Car>,
    ) { }

    public async createContract(contract: CreateContractDTO, carId: string): Promise<ContractDTO> {
        guard.should(validateUniqueId(carId), `The provided id ${carId} is random string`);
        const foundCar: Car = await this.carRepository.findOne({
            where: {
                id: carId,
            }
        });

        guard.exists(foundCar, 'The car is not found');
        guard.exists(foundCar && foundCar.isAvailable, 'The car is not available');

        const pickupDate: Date = new Date();
        const isReturnDateValid: boolean = isDateValid(pickupDate, contract.estimatedReturnDate);
        guard.should(!isReturnDateValid, 'Return date is invalid');

        const contractEnity: Contract = this.contractRepository.create({ ...contract, pickupDate });
        const carToBeHired: Car = await this.carRepository.save({
            ...foundCar,
            isAvailable: false
        });

        contractEnity.car = Promise.resolve(carToBeHired);
        const savedContract: Contract = await this.contractRepository.save(contractEnity);

        return this.mapToContractDTO(contractEnity);;
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
            where: { id: contractId }
        });

        guard.exists(foundContract, 'The contract is not found');
        guard.exists(foundContract && !foundContract.isClosed, 'The contract is already closed');

        const carToReturn: Car = await foundContract.car;
        const returnedCar: Car = await this.carRepository.save({
            ...carToReturn,
            isAvailable: true
        });

        const returnDate: Date = new Date();
        const finishedContract: Contract = await this.contractRepository.save({
            ...foundContract,
            returnDate,
            isClosed: true,
        });

        return this.mapToFinishedContractDTO(finishedContract);
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
