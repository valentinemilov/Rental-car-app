import {MigrationInterface, QueryRunner} from "typeorm";

export class add1583491022918 implements MigrationInterface {
    name = 'add1583491022918'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "contracts" ADD "returnDate" TIMESTAMP WITH TIME ZONE NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "contracts" DROP COLUMN "returnDate"`, undefined);
    }

}
