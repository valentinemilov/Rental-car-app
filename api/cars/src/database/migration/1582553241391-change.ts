import {MigrationInterface, QueryRunner} from "typeorm";

// eslint-disable-next-line @typescript-eslint/class-name-casing
export class change1582553241391 implements MigrationInterface {
    name = 'change1582553241391'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "contracts" ALTER COLUMN "isClosed" SET DEFAULT false`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "contracts" ALTER COLUMN "isClosed" SET DEFAULT true`, undefined);
    }

}
