/* eslint-disable @typescript-eslint/explicit-function-return-type */
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
import isPeriodValid from '../common/date-validation/date-validation';
import { ContractRepository } from '../database/repositories/ContractRepoitory';

@Injectable()
export class ContractService {
    static readonly CarNotFoundMsg = "The car is not found";
    static readonly CarIsNotAvailableMsg = "The car is not available";
    static getInvalidCarIdMsg = (carId: string): string => `The provided id ${carId} is random string`;

    static readonly ContractNotFoundMsg = "The car is not found";
    static readonly ContractAlreadyClosedMsg = "The contract is already closed";
    static getInvalidContractIdMsg = (contractId: string): string => `The provided id ${contractId} is random string`;

    static readonly InvalidReturnDate = "Return date is invalid";

    public constructor(
        private readonly contractRepository: ContractRepository,
        @InjectRepository(Car) private readonly carRepository: Repository<Car>,
    ) { }

    public async createContract(contract: CreateContractDTO, carId: string): Promise<ContractDTO> {
        guard.should(validateUniqueId(carId), ContractService.getInvalidCarIdMsg(carId));
        const foundCar: Car = await this.carRepository.findOne({
            where: {
                id: carId,
            },
        });

        guard.exists(foundCar, ContractService.CarNotFoundMsg);
        guard.should(foundCar.isAvailable, ContractService.CarIsNotAvailableMsg);

        const pickupDate: Date = this.getToday();

        const valid: boolean = isPeriodValid(pickupDate, contract.estimatedReturnDate);
        guard.should(valid, ContractService.InvalidReturnDate);

        const contractEntity: Contract = this.contractRepository.create({ ...contract, pickupDate });

        foundCar.isAvailable = false;
        contractEntity.car = Promise.resolve(foundCar);

        await this.contractRepository.persistBoth(foundCar, contractEntity);

        return ContractService.mapToContractDTO(contractEntity);
    }

    public async getAllContracts(): Promise<AllContractsDTO[]> {
        const allContracts: Contract[] = await this.contractRepository.find({
            where: {
                isClosed: false,
            },
            relations: ['car'],
        });

        const contractsToReturn = allContracts.map(async (contract: Contract) => {
            const tempContract = ContractService.mapToContractDTO(contract);
            const carInContract: Car = await contract.car;
            const tempCar = ContractService.carMapper(carInContract);

            return { ...tempContract, ...tempCar };
        });

        return await Promise.all(contractsToReturn);
    }

    public async closeContract(contractId: string): Promise<FinishedContractDTO> {
        guard.should(validateUniqueId(contractId), ContractService.getInvalidContractIdMsg(contractId));
        const foundContract: Contract = await this.contractRepository.findOne({
            where: { id: contractId },
        });

        guard.exists(foundContract, ContractService.ContractNotFoundMsg);
        guard.should(!foundContract.isClosed, ContractService.ContractAlreadyClosedMsg);

        const carToReturn: Car = await foundContract.car;
        carToReturn.isAvailable = true;

        const returnDate: Date = this.getToday();
        foundContract.returnDate = returnDate;
        foundContract.isClosed = true;

        await this.contractRepository.persistBoth(carToReturn, foundContract);

        return ContractService.mapToFinishedContractDTO(foundContract);
    }

    public static mapToContractDTO({ id, firstName, lastName, age, pickupDate, estimatedReturnDate }) {
        return { id, firstName, lastName, age, pickupDate, estimatedReturnDate };
    }

    public static carMapper({ model, brand, price }) {
        return { model, brand, price };
    }

    public static mapToFinishedContractDTO({ id, firstName, lastName, age, pickupDate, estimatedReturnDate, returnDate }) {
        return { id, firstName, lastName, age, pickupDate, estimatedReturnDate, returnDate };
    }

    public getToday(): Date {
        return new Date();
    }
}
