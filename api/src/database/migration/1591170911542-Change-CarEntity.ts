import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeCarEntity1591170911542 implements MigrationInterface {
    name = 'ChangeCarEntity1591170911542'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "class"`, undefined);
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "price"`, undefined);
        await queryRunner.query(`ALTER TABLE "cars" DROP CONSTRAINT "FK_0d84b16e0ac645021378dfb170e"`, undefined);
        await queryRunner.query(`ALTER TABLE "cars" ALTER COLUMN "carClassId" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "cars" ADD CONSTRAINT "FK_0d84b16e0ac645021378dfb170e" FOREIGN KEY ("carClassId") REFERENCES "classes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars" DROP CONSTRAINT "FK_0d84b16e0ac645021378dfb170e"`, undefined);
        await queryRunner.query(`ALTER TABLE "cars" ALTER COLUMN "carClassId" SET NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "cars" ADD CONSTRAINT "FK_0d84b16e0ac645021378dfb170e" FOREIGN KEY ("carClassId") REFERENCES "classes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "cars" ADD "price" double precision NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "cars" ADD "class" text NOT NULL`, undefined);
    }

}
