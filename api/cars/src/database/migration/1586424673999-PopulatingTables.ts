import { MigrationInterface, QueryRunner } from "typeorm";

import { now, addHoursFromNow, subtractHoursFromNow } from '../date-manipulation/date-manipulation';

export class PopulatingTables1586424673999 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(
            `INSERT INTO "cars"("model", "class", "price", "picture", "brand") 
                VALUES ('Gallardo', 'A', 100, 'http://localhost:3001/public/lamborghini_gallardo.jpg', 'Lamborghini'),
                        ('Viper', 'A', 100, 'http://localhost:3001/public/dodge_viper.jpg', 'Dodge'),
                        ('Rapide', 'B', 80, 'http://localhost:3001/public/aston_martin_rapide.jpg', 'Aston Martin'),  
                        ('AMG', 'B', 80, 'http://localhost:3001/public/Mercedes_Benz_G_Class_G63_AMG.jpg', 'Mercedes'),
                        ('RS3', 'C', 70, 'http://localhost:3001/public/audi_RS3.jpg', 'Audi'),
                        ('Touareg', 'C', 70, 'http://localhost:3001/public/vw_touareg_v8.jpg', 'Volkswagen'),
                        ('407', 'D', 60, 'http://localhost:3001/public/moskvich_407.jpg', 'Moskvich'),
                        ('Riva', 'D', 60, 'http://localhost:3001/public/lada_riva.jpg', 'Lada'),
                        ('insignia', 'E', 40, 'http://localhost:3001/public/Opel_2018_Insignia.jpg', 'Opel'),
                        ('407', 'E', 40, 'http://localhost:3001/public/peugeot_407.jpg', 'Peugeot');

            INSERT INTO "cars"("id", "model", "class", "price", "picture", "isAvailable", "brand") 
                VALUES ('21d32244-7a48-11ea-bc55-0242ac130003', 'AMG GT', 'A', 100, 'http://localhost:3001/public/mercedes_benz_sls_amg.jpg', 'false', 'Mercedes'),
                        ('af44544a-7af7-11ea-bc55-0242ac130003', 'X6', 'A', 100, 'http://localhost:3001/public/bmw_x6_m.jpg', 'false', 'BMW');

            INSERT INTO "contracts"("firstName", "lastName", "age", "pickupDate", "estimatedReturnDate", "carId" ) 
                VALUES ('Anthony', 'Davies', 26, '${subtractHoursFromNow(now(), 25)}', '${addHoursFromNow(now(), 23)}', '21d32244-7a48-11ea-bc55-0242ac130003'),
                        ('Kawhi', 'Leonard', 27, '${subtractHoursFromNow(now(), 48)}', '${addHoursFromNow(now(), 6)}', 'af44544a-7af7-11ea-bc55-0242ac130003');
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`
            DELETE FROM "contracts";
            DELETE FROM "cars"
        `);
    }

}
