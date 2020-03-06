import {MigrationInterface, QueryRunner} from "typeorm";

export class add1583491706249 implements MigrationInterface {
    name = 'add1583491706249'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "contracts" ADD "returnDate" TIMESTAMP WITH TIME ZONE`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "contracts" DROP COLUMN "returnDate"`, undefined);
    }

}
