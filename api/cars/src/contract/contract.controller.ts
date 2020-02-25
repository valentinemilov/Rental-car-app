import {
    Controller,
    Post,
    Body,
    Param,
    Get,
    Put,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';

import { ContractService } from './contract.service';
import { CreateContractDTO } from './models/create-contract';
import { Contract } from '../database/entities/contract.entity';

@Controller()
export class ContractController {
    public constructor(
        private readonly contractService: ContractService,
    ) { }

    @Get('contract')
    public async getContracts(): Promise<Contract[]> {
        const contracts: Contract[] = await this.contractService.getAllContracts();

        return contracts;
    }

    @Post('car/:id/contract')
    @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
    public async createContract(
        @Body() contract: CreateContractDTO,
        @Param('id') carId: string
    ): Promise<Contract> {
        const createdContract: Contract = await this.contractService.createContract(contract, carId);

        return createdContract;
    }

    @Put('contract/:id')
    public async closeContract(@Param('id') contractId: string): Promise<Contract> {
        const contractToClose: Contract = await this.contractService.closeContract(contractId);

        return contractToClose;
    }
}
