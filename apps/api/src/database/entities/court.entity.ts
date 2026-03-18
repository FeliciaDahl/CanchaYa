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
import { Facility } from './facility.entity';
import { TimeSlot } from './timeslot.entity';

@Entity('courts')
@Index(['facilityId'])
export class Court {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid' })
  facilityId!: string;

  @Column({ type: 'varchar', length: 255 })
  name!: string;

  @Column({
    type: 'enum',
    enum: ['clay', 'artificial', 'hard'],
  })
  surface!: 'clay' | 'artificial' | 'hard';

  @Column({ type: 'boolean', default: false })
  hasLights!: boolean;

  @Column({ type: 'int', default: 4 })
  capacity!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToOne(() => Facility, (facility) => facility.courts, {
    onDelete: 'CASCADE',
  })
  facility!: Facility;

  @OneToMany(() => TimeSlot, (timeSlot) => timeSlot.court)
  timeSlots!: TimeSlot[];
}
