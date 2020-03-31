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
import { ContractDTO } from './models/contract';
import { FinishedContractDTO } from './models/finished-contract';
import { AllContractsDTO } from './models/all-contracts';

@Controller()
export class ContractController {
    public constructor(
        private readonly contractService: ContractService,
    ) { }

    @Get('contract')
    public async getContracts(): Promise<AllContractsDTO[]> {
        return await this.contractService.getAllContracts();
    }

    @Post('car/:id/contract')
    @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
    public async createContract(
        @Body() contract: CreateContractDTO,
        @Param('id') carId: string
    ): Promise<ContractDTO> {
        return await this.contractService.createContract(contract, carId);
    }

    @Put('contract/:id')
    public async closeContract(
        @Param('id') contractId: string
        ): Promise<FinishedContractDTO> {
        return await this.contractService.closeContract(contractId);
    }
}
