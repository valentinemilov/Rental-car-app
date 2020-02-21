import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { CarClass } from '../../common/enums/car-class';
import { Contract } from './contract.entity';

@Entity('cars')
export class Car {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text', nullable: false })
    model: string;

    @Column({ type: 'text', nullable: false })
    class: CarClass;

    @Column({ type: 'float', nullable: false })
    price: number;

    @Column({ type: 'text', nullable: false })
    picture: string;

    @Column({ type: 'boolean', default: true, nullable: false })
    isAvailable: boolean;

    @OneToMany(() => Contract, contracts => contracts.car)
    contracts: Promise<Contract[]>
}
