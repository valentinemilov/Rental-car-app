import {MigrationInterface, QueryRunner} from "typeorm";

export class PopulatingTables1586424673999 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(
            `INSERT INTO "cars"("model", "class", "price", "picture", "brand") 
                VALUES ('Rapide', 'A', 100, 'TOBECONTINUED', "Aston Martin"),
                VALUES ('Viper', 'A', 100, 'TOBECONTINUED', "Dodge"),
                VALUES ('X6', 'B', 80, 'TOBECONTINUED', "BMW"),
                VALUES ('cls', 'B', 80, 'TOBECONTINUED', "Mercedes"),
                VALUES ('A4', 'C', 70, 'TOBECONTINUED', "Audi"),
                VALUES ('Touareg', 'C', 70, 'TOBECONTINUED', "Volkswagen"),
                VALUES ('407', 'D', 60, 'TOBECONTINUED', "Moskvich"),
                VALUES ('Riva', 'D', 60, 'TOBECONTINUED', "Lada"),
                VALUES ('insignia', 'E', 40, 'TOBECONTINUED', "Opel"),
                VALUES ('407', 'E', 40, 'TOBECONTINUED', "Peugeot"),

                INSERT INTO "cars"("id" "model", "class", "price", "picture", "isAvailable" "brand") 
                VALUES ('21d32244-7a48-11ea-bc55-0242ac130003' '', 'A', 100, 'TOBECONTINUED', "Aston Martin"),
                VALUES ('Viper', 'A', 100, 'TOBECONTINUED', "Dodge"),
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
