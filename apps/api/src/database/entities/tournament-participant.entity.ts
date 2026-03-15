import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  Index,
} from 'typeorm';
import { Tournament } from './tournament.entity';
import { User } from './user.entity';

@Entity('tournament_participants')
@Index(['tournamentId'])
@Index(['userId'])
export class TournamentParticipant {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid' })
  tournamentId!: string;

  @Column({ type: 'uuid' })
  userId!: string;

  @CreateDateColumn()
  joinedAt!: Date;

  @ManyToOne(() => Tournament, (tournament) => tournament.participants, {
    onDelete: 'CASCADE',
  })
  tournament!: Tournament;

  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
  })
  user!: User;
}
