import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Task } from './task';

@Entity()
export class Priority {
    /* The primary key. */
    @PrimaryGeneratedColumn() id: number;
    /* The priority: 'Urgent', 'High', 'Medium', 'Low'. */
    @Column({ length: 6 }) value: string;
    @Column() color: string;
}
