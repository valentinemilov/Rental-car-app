/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateContractDTO } from './models/create-contract';
import { Contract } from '../database/entities/contract.entity';
import { Car } from '../database/entities/car.entity';
import { ApplicationError } from '../common/exceptions/app.error';
import { CloseContractDTO } from './models/close-contract';
import { ContractDTO } from './models/contract';
import { FinishedContractDTO } from './models/finished-contract';
import { AllContractsDTO } from './models/all-contracts';
import validateUniqueId from '../common/uuid-validation/uuid-validation';

@Injectable()
export class ContractService {
    public constructor(
        @InjectRepository(Contract) private readonly contractRepository: Repository<Contract>,
        @InjectRepository(Car) private readonly carRepository: Repository<Car>,
    ) { }

    public async createContract(contract: CreateContractDTO, carId: string): Promise<ContractDTO> {
        if (!validateUniqueId(carId)) {
            throw new ApplicationError(`The provided id ${carId} is random string`, 400);
        }
   
        const foundCar: Car = await this.carRepository.findOne({
            where: {
                id: carId,
            }
        })

        if (!foundCar) {
            throw new ApplicationError('The car is not found', 404);
        }

        if(!foundCar.isAvailable) {
            throw new ApplicationError('The car is not available', 400);
        }

        const contractEnity: Contract = this.contractRepository.create(contract);
        const carToBeHired: Car = await this.carRepository.save({
            ...foundCar,
            isAvailable: false
        });

        contractEnity.car = Promise.resolve(carToBeHired);
        const savedContract: Contract = await this.contractRepository.save(contractEnity);

        const mapper = ({ id, firstName, lastName, age, pickupDate, estimatedReturnDate }) =>
            ({ id, firstName, lastName, age, pickupDate, estimatedReturnDate });
        const createdContract: ContractDTO = mapper(contractEnity);

        return createdContract;
    }

    public async getAllContracts(): Promise<AllContractsDTO[]> {
        const allContracts: Contract[] = await this.contractRepository.find({
            where: {
                isClosed: false,
            },
            relations: ['car'],
        })

        const contractMapper = ({ id, firstName, lastName, age, pickupDate, estimatedReturnDate }) =>
            ({ id, firstName, lastName, age, pickupDate, estimatedReturnDate });
        const carMapper = ({ model, price }) => ({ model, price });

        const contractsToReturn = allContracts.map(async(contract: Contract) => {
            const tempContract = contractMapper(contract);
            const carInContract: Car = await contract.car;
            const tempCar = carMapper(carInContract);

            return {...tempContract, ...tempCar}
        })

        return await Promise.all(contractsToReturn);
    }

    public async closeContract(dateToReturn: CloseContractDTO, contractId: string): Promise<FinishedContractDTO> {
        if (!validateUniqueId(contractId)) {
            throw new ApplicationError(`The provided id ${contractId} is random string`, 400);
        }

        const foundContract: Contract = await this.contractRepository.findOne({
            where: { id: contractId }
        })

        if (!foundContract) {
            throw new ApplicationError('The contract is not found', 404);
        }

        if(foundContract.isClosed) {
            throw new ApplicationError('The contract is already closed', 400);
        }

        const carToReturn: Car = await foundContract.car;
        const returnedCar: Car = await this.carRepository.save({
            ...carToReturn,
            isAvailable: true
        })

        const finishedContract: Contract = await this.contractRepository.save({
            ...foundContract,
            returnDate: dateToReturn.returnDate,
            isClosed: true,
        });

        const mapper = ({ id, firstName, lastName, age, pickupDate, estimatedReturnDate, returnDate }) =>
            ({ id, firstName, lastName, age, pickupDate, estimatedReturnDate, returnDate });
        const finishedContractToReturn: FinishedContractDTO = mapper(finishedContract);

        return finishedContractToReturn;
    }
}
