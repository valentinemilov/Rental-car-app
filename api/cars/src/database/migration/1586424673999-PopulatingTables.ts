import { MigrationInterface, QueryRunner } from "typeorm";

import { now, addHoursFromNow, subtractHoursFromNow } from '../date-manipulation/date-manipulation';

export class PopulatingTables1586424673999 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(
            `INSERT INTO "cars"("model", "class", "price", "picture", "brand") 
                VALUES ('Gallardo', 'A', 100, 'https://images.wallpaperscraft.com/image/lamborghini_gallardo_cars_car_79728_1280x720.jpg', 'Lamborghini'),
                        ('Viper', 'A', 100, 'https://www.hdcarwallpapers.com/walls/1967_charge_cars_ford_mustang_4k_2-HD.jpg', 'Dodge'),
                        ('Rapide', 'B', 80, 'https://images.wallpaperscraft.com/image/aston_martin_db9_gt_side_view_106890_1280x720.jpg', 'Aston Martin'),  
                        ('AMG', 'B', 80, 'https://s1.1zoom.me/big0/327/Mercedes-Benz_G-Class_G63_AMG_Black_546721_1280x720.jpg', 'Mercedes'),
                        ('RS3', 'C', 70, 'https://cdn.wallpapersafari.com/18/52/eRwVc5.jpg', 'Audi'),
                        ('Touareg', 'C', 70, 'https://cdn.motor1.com/images/mgl/9M9Z1/s3/vw-touareg-v8-tdi-by-abt.jpg', 'Volkswagen'),
                        ('407', 'D', 60, 'https://www.kingmods.net/uploads/fs19-mods/image2/2-MOSKVICH_407_FS19.jpg', 'Moskvich'),
                        ('Riva', 'D', 60, 'https://s1.1zoom.me/big0/431/431455-Kycb.jpg', 'Lada'),
                        ('insignia', 'E', 40, 'https://s1.1zoom.me/big0/893/Opel_2018_Insignia_GSi_Orange_Sedan_538119_1280x720.jpg', 'Opel'),
                        ('407', 'E', 40, 'https://wall.bestcarmag.com/sites/default/files/styles/1280x720/public/peugeot-407-wallpaper-hd-40721-5465840.jpg?itok=3PZ0o0y1', 'Peugeot');

            INSERT INTO "cars"("id", "model", "class", "price", "picture", "isAvailable", "brand") 
                VALUES ('21d32244-7a48-11ea-bc55-0242ac130003', 'AMG GT', 'A', 100, 'https://images.wallpaperscraft.com/image/mercedes-benz_sls_amg_yellow_auto_83265_1280x720.jpg', 'false', 'Mercedes'),
                        ('af44544a-7af7-11ea-bc55-0242ac130003', 'X6', 'A', 100, 'https://wallpaperfx.com/view_image/bmw-x6-m-1280x720-wallpaper-16901.jpg', 'false', 'BMW');

            INSERT INTO "contracts"("firstName", "lastName", "age", "pickupDate", "estimatedReturnDate", "carId" ) 
                VALUES ('Anthony', 'Davies', 26, '${subtractHoursFromNow(now(), 25)}', '${addHoursFromNow(now(), 23)}', '21d32244-7a48-11ea-bc55-0242ac130003'),
                        ('Kawhi', 'Leonard', 27, '${subtractHoursFromNow(now(), 48)}', '${addHoursFromNow(now(), 6)}', 'af44544a-7af7-11ea-bc55-0242ac130003');
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`
        DELETE FROM "cars";
        DELETE FROM "contracts"`);
    }

}
