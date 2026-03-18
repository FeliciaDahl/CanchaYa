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
import { User } from './user.entity';
import { Court } from './court.entity';
import { Tournament } from './tournament.entity';
import { Point } from 'geojson';

@Entity('facilities')
@Index(['ownerId'])
@Index(['location'], { spatial: true })
export class Facility {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid' })
  ownerId!: string;

  @Column({ type: 'varchar', length: 255 })
  name!: string;

  @Column({ type: 'text', nullable: true })
  description!: string;

  @Column({ type: 'varchar', length: 255 })
  address!: string;

  @Column({ type: 'varchar', length: 100 })
  city!: string;

  @Column({
    type: 'geography',
    spatialFeatureType: 'Point',
    srid: 4326,
    nullable: true,
  })
  location!: Point;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phone!: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  website!: string;

  @Column({ type: 'jsonb', default: '[]' })
  imageUrls!: string[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToOne(() => User, (user) => user.facilities, {
    onDelete: 'CASCADE',
  })
  owner!: User;

  @OneToMany(() => Court, (court) => court.facility)
  courts!: Court[];

  @OneToMany(() => Tournament, (tournament) => tournament.facility)
  tournaments!: Tournament[];
}
