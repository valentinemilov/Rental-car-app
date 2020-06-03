import {MigrationInterface, QueryRunner} from "typeorm";

export class PopulateCarsWithClassId1591110379327 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`Update "cars" SET "carClassId" = subquery.id FROM (SELECT classes.class, classes.id FROM "classes") AS subquery WHERE subquery.class = cars.class`, undefined);
        await queryRunner.query(`ALTER TABLE "cars" ALTER COLUMN "carClassId" SET NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
