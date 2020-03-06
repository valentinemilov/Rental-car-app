import {MigrationInterface, QueryRunner} from "typeorm";

export class delete1583490944921 implements MigrationInterface {
    name = 'delete1583490944921'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "contracts" DROP COLUMN "returnDate"`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "contracts" ADD "returnDate" TIMESTAMP WITH TIME ZONE NOT NULL`, undefined);
    }

}
