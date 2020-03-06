import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Car } from './car.entity';

@Entity('contracts')
export class Contract {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text', nullable: false })
    firstName: string;

    @Column({ type: 'text', nullable: false })
    lastName: string;

    @Column({ type: 'integer', nullable: false })
    age: number;

    @Column({ type: 'timestamp with time zone', nullable: false })
    pickupDate: string;

    @Column({ type: 'timestamp with time zone', nullable: false })
    estimatedReturnDate: string;

    @Column({ type: 'timestamp with time zone', nullable: true })
    returnDate: string;

    @Column({ type: 'boolean', default: false, nullable: false })
    isClosed: boolean;

    @ManyToOne(() => Car, car => car.contracts)
    car: Promise<Car>
}
