import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ContractController } from './contract.controller';
import { ContractService } from './contract.service';
import { Contract } from '../database/entities/contract.entity';
import { Car } from '../database/entities/car.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Car, Contract])],
  controllers: [ContractController],
  providers: [ContractService],
})
export class ContractModule {}
