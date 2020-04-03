import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { CarModule } from './car/car.module';
import { ContractModule } from './contract/contract.module';
import { ContractRepositoryProvider } from './database/repositories/ContractRepoitory';

@Module({
  imports: [DatabaseModule, CarModule, ContractModule],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    ContractRepositoryProvider,
  ],
})
export class AppModule { }
