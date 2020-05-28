import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

/* eslint-disable import/no-cycle */
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
    pickupDate: Date;

    @Column({ type: 'timestamp with time zone', nullable: false })
    estimatedReturnDate: Date;

    @Column({ type: 'timestamp with time zone', nullable: true })
    returnDate: Date;

    @Column({ type: 'boolean', default: false, nullable: false })
    isClosed: boolean;

    @Column({ type: 'float', nullable: false })
    basePrice: number;

    @ManyToOne(() => Car, car => car.contracts)
    car: Promise<Car>
}
