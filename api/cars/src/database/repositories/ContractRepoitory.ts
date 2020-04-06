import { EntityRepository, Repository, getManager, Connection } from "typeorm";
import { Injectable } from "@nestjs/common";
import { Contract } from "../entities/contract.entity";
import { Car } from "../entities/car.entity";

@Injectable()
@EntityRepository(Contract)
export class ContractRepository extends Repository<Contract> {

  public async persistBoth(car: Car, contract: Contract): Promise<void> {
    await getManager().transaction(async transactionalManager => {
      await transactionalManager.save(car);
      await transactionalManager.save(contract);
    });
  } 
}

export const ContractRepositoryProvider = {
  provide: 'ContractRepository',
  useFactory: (connection: Connection) => connection.getCustomRepository(ContractRepository),
  inject: [Connection],
};
