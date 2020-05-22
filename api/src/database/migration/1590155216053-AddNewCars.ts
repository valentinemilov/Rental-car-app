import {MigrationInterface, QueryRunner} from "typeorm";

export class AddNewCars1590155216053 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(
            `INSERT INTO "cars"("model", "class", "price", "picture", "brand") 
                VALUES ('Q8 Sport', 'A', 100, 'http://localhost:3001/public/audi_q8_sport.jpg', 'Audi'),
                    ('TT', 'C', 70, 'http://localhost:3001/public/audi_tt.jpg', 'Audi'),
                    ('AC Schnitzer', 'A', 100, 'http://localhost:3001/public/bmw_8_series.jpg', 'BMW'),
                    ('X3', 'B', 80, 'http://localhost:3001/public/bmw_x3.jpg', 'BMW'),
                    ('Benz 500', 'C', 70, 'http://localhost:3001/public/mercedesbenz_500k.jpg', 'Mercedes'),
                    ('E Cabriolet', 'B', 80, 'http://localhost:3001/public/mercedes_benz_e_class.jpg', 'Mercedes'),
                    ('GT', 'A', 100, 'http://localhost:3001/public/mercedes_benz_gla_250_4matic.jpg', 'Mercedes'),
                    ('Maybach', 'A', 100, 'http://localhost:3001/public/mercedes_maybach_gls_600.jpg', 'Mercedes');
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
