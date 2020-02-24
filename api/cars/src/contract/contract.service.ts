/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateContractDTO } from './models/create-contract';
import { Contract } from '../database/entities/contract.entity';
import { Car } from '../database/entities/car.entity';
import { CarError } from '../common/exceptions/car.error';

@Injectable()
export class ContractService {
    public constructor(
        @InjectRepository(Contract) private readonly contractRepository: Repository<Contract>,
        @InjectRepository(Car) private readonly carRepository: Repository<Car>,
    ) { }


    public async createContract(contract: CreateContractDTO, carId: string): Promise<Contract> {
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

        return savedContract;
    }

    public async getAllContracts(): Promise<Contract[]> {
        const allContracts: Contract[] = await this.contractRepository.find({
            where: {
                isClosed: false,
            }
        })

        return allContracts;
    }

    public async closeContract(contractId: string): Promise<Contract> {
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
            isClosed: true
        });

        // These lines down have to be made better!!!
        return await this.contractRepository.findOne({
            where: { id: finishedContract.id },
            relations: ['car'],
        });

        // return finishedContract;
    }
}
