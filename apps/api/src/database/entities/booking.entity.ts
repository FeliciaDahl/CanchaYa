import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Index,
} from 'typeorm';
import { User } from './user.entity';
import { TimeSlot } from './timeslot.entity';

@Entity('bookings')
@Index(['userId'])
@Index(['timeSlotId'])
@Index(['status'])
@Index(['userId', 'status'])
@Index(['createdAt'])
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid' })
  userId!: string;

  @Column({ type: 'uuid' })
  timeSlotId!: string;

  @Column({
    type: 'enum',
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending',
  })
  status!: 'pending' | 'confirmed' | 'cancelled' | 'completed';

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  totalPrice!: number;

  @Column({ type: 'text', nullable: true })
  notes!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToOne(() => User, (user) => user.bookings, {
    onDelete: 'CASCADE',
  })
  user!: User;

  @ManyToOne(() => TimeSlot, (timeSlot) => timeSlot.bookings, {
    onDelete: 'CASCADE',
  })
  timeSlot!: TimeSlot;
}
