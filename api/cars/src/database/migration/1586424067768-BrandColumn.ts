import {MigrationInterface, QueryRunner} from "typeorm";

export class BrandColumn1586424067768 implements MigrationInterface {
    name = 'BrandColumn1586424067768'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars" ADD "brand" text NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "brand"`, undefined);
    }

}
