import {MigrationInterface, QueryRunner} from "typeorm";

export class delete1583491464092 implements MigrationInterface {
    name = 'delete1583491464092'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "contracts" DROP COLUMN "returnIntermedDate"`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "contracts" ADD "returnIntermedDate" TIMESTAMP WITH TIME ZONE NOT NULL`, undefined);
    }

}
