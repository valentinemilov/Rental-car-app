/* eslint-disable import/no-cycle */
import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Car } from './car.entity';

@Entity('classes')
export class CarClass {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text', nullable: false })
    class: string;

    @Column({ type: 'float', nullable: false })
    price: number;

    @OneToMany(() => Car, cars => cars.carClass)
    cars: Car[];
}
