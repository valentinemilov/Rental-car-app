import { MigrationInterface, QueryRunner } from "typeorm";

export class PopulateCarClassEntity1591108488894 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(
            `INSERT INTO "classes"("class", "price") 
                VALUES ('A', 100),
                    ('B', 80),
                    ('C', 70),
                    ('D', 60),
                    ('E', 40);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
