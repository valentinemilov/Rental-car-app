import {MigrationInterface, QueryRunner} from "typeorm";

export class CarClassEntity1591107850409 implements MigrationInterface {
    name = 'CarClassEntity1591107850409'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "classes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "class" text NOT NULL, "price" double precision NOT NULL, CONSTRAINT "PK_e207aa15404e9b2ce35910f9f7f" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "cars" ADD "carClassId" uuid`, undefined);
        await queryRunner.query(`ALTER TABLE "cars" ADD CONSTRAINT "FK_0d84b16e0ac645021378dfb170e" FOREIGN KEY ("carClassId") REFERENCES "classes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars" DROP CONSTRAINT "FK_0d84b16e0ac645021378dfb170e"`, undefined);
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "carClassId"`, undefined);
        await queryRunner.query(`DROP TABLE "classes"`, undefined);
    }

}
