import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Unique,
} from 'typeorm';

// Placeholder - will be in database/entities/user.entity.ts
@Entity('users')
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  passwordHash: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phone: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  avatarUrl: string;

  @Column({
    type: 'enum',
    enum: ['player', 'facility_owner', 'admin'],
    default: 'player',
  })
  role: 'player' | 'facility_owner' | 'admin';

  @Column({ type: 'varchar', length: 50, nullable: true })
  oauthProvider: 'google' | 'apple' | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  oauthId: string;

  @Column({ type: 'boolean', default: false })
  emailVerified: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
