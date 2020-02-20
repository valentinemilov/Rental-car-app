import { Entity, PrimaryColumn, Column, ManyToOne } from 'typeorm';

import { Car } from './car.entity';

@Entity('contracts')
export class Contract {
    @PrimaryColumn('uuid')
    id: string;

    @Column({ type: 'text', nullable: false })
    firstName: string;

    @Column({ type: 'text', nullable: false })
    lastName: string;

    @Column({ type: 'integer', nullable: false })
    age: number;

    @Column({ type: 'date', nullable: false })
    pickupDate: string;

    @Column({ type: 'date', nullable: false })
    estimatedReturnDate: string;

    @Column({ type: 'boolean', default: true, nullable: false })
    isClosed: boolean;

    @ManyToOne(() => Car, car => car.contracts)
    car: Promise<Car>
}
