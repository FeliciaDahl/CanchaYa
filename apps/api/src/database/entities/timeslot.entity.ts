import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  Index,
} from 'typeorm';
import { Court } from './court.entity';
import { Booking } from './booking.entity';

@Entity('timeslots')
@Index(['courtId'])
@Index(['startTime'])
@Index(['courtId', 'available'])
export class TimeSlot {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid' })
  courtId!: string;

  @Column({ type: 'timestamp' })
  startTime!: Date;

  @Column({ type: 'timestamp' })
  endTime!: Date;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  price!: number;

  @Column({ type: 'boolean', default: true })
  available!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToOne(() => Court, (court) => court.timeSlots, {
    onDelete: 'CASCADE',
  })
  court!: Court;

  @OneToMany(() => Booking, (booking) => booking.timeSlot)
  bookings!: Booking[];
}
