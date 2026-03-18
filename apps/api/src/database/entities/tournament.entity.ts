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
import { TournamentParticipant } from './tournament-participant.entity';

@Entity('tournaments')
@Index(['facilityId'])
@Index(['status'])
export class Tournament {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid' })
  facilityId!: string;

  @Column({ type: 'varchar', length: 255 })
  name!: string;

  @Column({ type: 'text', nullable: true })
  description!: string;

  @Column({ type: 'int' })
  maxParticipants!: number;

  @Column({ type: 'int', default: 0 })
  currentParticipants!: number;

  @Column({ type: 'timestamp' })
  startDate!: Date;

  @Column({ type: 'timestamp' })
  endDate!: Date;

  @Column({
    type: 'enum',
    enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
    default: 'upcoming',
  })
  status!: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToOne(() => Facility, (facility) => facility.tournaments, {
    onDelete: 'CASCADE',
  })
  facility!: Facility;

  @OneToMany(
    () => TournamentParticipant,
    (participant) => participant.tournament,
  )
  participants!: TournamentParticipant[];
}
