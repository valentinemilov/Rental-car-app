/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateContractDTO } from './models/create-contract';
import { Contract } from '../database/entities/contract.entity';
import { Car } from '../database/entities/car.entity';
import { CarError } from '../common/exceptions/car.error';
import { CloseContractDTO } from './models/close-contract';
import { ContractDTO } from './models/contract';
import { FinishedContractDTO } from './models/finished-contract';

@Injectable()
export class ContractService {
    public constructor(
        @InjectRepository(Contract) private readonly contractRepository: Repository<Contract>,
        @InjectRepository(Car) private readonly carRepository: Repository<Car>,
    ) { }

    public async createContract(contract: CreateContractDTO, carId: string): Promise<ContractDTO> {
        const foundCar: Car = await this.carRepository.findOne({
            where: {
                id: carId,
                isAvailable: true,
            }
        })

        if (foundCar === undefined || foundCar === null) {
            throw new CarError('The required car is not found', 400);
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

    public async getAllContracts(): Promise<any[]> {
        const allContracts: Contract[] = await this.contractRepository.find({
            where: {
                isClosed: false,
            },
            relations: ['car'],
        })

        const contractMapper = ({ id, firstName, lastName, age, pickupDate, estimatedReturnDate }) =>
            ({ id, firstName, lastName, age, pickupDate, estimatedReturnDate });
        const carMapper = ({ model, price }) => ({ model, price });

        const contractsToReturn = allContracts.map(async(contract) => {
            const tempContract = contractMapper(contract);
            const carInContract = await contract.car;
            const tempCar = carMapper(carInContract);
            
            return {...tempContract, ...tempCar}
        })

        // console.log(contractsToReturn);
        return allContracts;
    }

    public async closeContract(dateToReturn: CloseContractDTO, contractId: string): Promise<FinishedContractDTO> {
        const foundContract: Contract = await this.contractRepository.findOne({
            where: {
                id: contractId,
                isClosed: false,
            }
        })

        if (foundContract === undefined || foundContract === null) {
            throw new CarError('The current contract is not found', 400);
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
