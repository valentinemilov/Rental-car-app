import {MigrationInterface, QueryRunner} from "typeorm";

export class AddBasePriceCol1590680777680 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "contracts" ADD "basePrice" double precision`, undefined);
        await queryRunner.query(`Update "contracts" SET "basePrice" = subquery.price FROM (SELECT price, id FROM "cars") AS subquery WHERE subquery.id = "carId"`);
        await queryRunner.query(`ALTER TABLE "contracts" ALTER COLUMN "basePrice" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
