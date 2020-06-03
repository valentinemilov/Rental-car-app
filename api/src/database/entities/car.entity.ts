/* eslint-disable import/no-cycle */
import { Entity, Column, OneToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Contract } from './contract.entity';
import { CarClass } from './car-class.entity';

@Entity('cars')
export class Car {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text', nullable: false })
    brand: string;

    @Column({ type: 'text', nullable: false })
    model: string;

    @Column({ type: 'text', nullable: false })
    picture: string;

    @Column({ type: 'boolean', default: true, nullable: false })
    isAvailable: boolean;

    @OneToMany(() => Contract, contracts => contracts.car)
    contracts: Promise<Contract[]>

    @ManyToOne(() => CarClass, carClass => carClass.cars, { eager: true })
    carClass: CarClass;
}
