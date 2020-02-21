import {MigrationInterface, QueryRunner} from "typeorm";

export class test1582280312028 implements MigrationInterface {
    name = 'test1582280312028'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "contracts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" text NOT NULL, "lastName" text NOT NULL, "age" integer NOT NULL, "pickupDate" date NOT NULL, "estimatedReturnDate" date NOT NULL, "isClosed" boolean NOT NULL DEFAULT true, "carId" uuid, CONSTRAINT "PK_2c7b8f3a7b1acdd49497d83d0fb" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "cars" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "model" text NOT NULL, "class" text NOT NULL, "price" double precision NOT NULL, "picture" text NOT NULL, "isAvailable" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_fc218aa84e79b477d55322271b6" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "contracts" ADD CONSTRAINT "FK_17a246cb31bbb22248b31b08895" FOREIGN KEY ("carId") REFERENCES "cars"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "contracts" DROP CONSTRAINT "FK_17a246cb31bbb22248b31b08895"`, undefined);
        await queryRunner.query(`DROP TABLE "cars"`, undefined);
        await queryRunner.query(`DROP TABLE "contracts"`, undefined);
    }

}
