import {MigrationInterface, QueryRunner} from "typeorm";

export class intermediate1583490876722 implements MigrationInterface {
    name = 'intermediate1583490876722'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "contracts" ADD "returnIntermedDate" TIMESTAMP WITH TIME ZONE NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "contracts" DROP COLUMN "returnIntermedDate"`, undefined);
    }

}
