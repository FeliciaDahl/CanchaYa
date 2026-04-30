# TypeORM Entities for CanchaYa API

## Setup Instructions

Create these files in `apps/api/src/database/entities/`:

---

## 1. user.entity.ts

```typescript
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Unique,
} from 'typeorm';
import { Facility } from './facility.entity';
import { Booking } from './booking.entity';

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

  @OneToMany(() => Facility, (facility) => facility.owner)
  facilities: Facility[];

  @OneToMany(() => Booking, (booking) => booking.user)
  bookings: Booking[];
}
```

---

## 2. facility.entity.ts

```typescript
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { Court } from './court.entity';
import { Tournament } from './tournament.entity';
import { Point } from 'geojson';

@Entity('facilities')
export class Facility {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  ownerId: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 255 })
  address: string;

  @Column({ type: 'varchar', length: 100 })
  city: string;

  @Column({
    type: 'geography',
    spatialFeatureType: 'Point',
    srid: 4326,
    nullable: true,
  })
  location: Point;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phone: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  website: string;

  @Column({ type: 'jsonb', default: '[]' })
  imageUrls: string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.facilities)
  owner: User;

  @OneToMany(() => Court, (court) => court.facility)
  courts: Court[];

  @OneToMany(() => Tournament, (tournament) => tournament.facility)
  tournaments: Tournament[];
}
```

---

## 3. court.entity.ts

```typescript
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Facility } from './facility.entity';
import { TimeSlot } from './timeslot.entity';

@Entity('courts')
export class Court {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  facilityId: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({
    type: 'enum',
    enum: ['clay', 'artificial', 'hard'],
  })
  surface: 'clay' | 'artificial' | 'hard';

  @Column({ type: 'boolean', default: false })
  hasLights: boolean;

  @Column({ type: 'int', default: 4 })
  capacity: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Facility, (facility) => facility.courts, {
    onDelete: 'CASCADE',
  })
  facility: Facility;

  @OneToMany(() => TimeSlot, (timeSlot) => timeSlot.court)
  timeSlots: TimeSlot[];
}
```

---

## 4. timeslot.entity.ts

```typescript
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Court } from './court.entity';
import { Booking } from './booking.entity';

@Entity('timeslots')
export class TimeSlot {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  courtId: string;

  @Column({ type: 'timestamp' })
  startTime: Date;

  @Column({ type: 'timestamp' })
  endTime: Date;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'boolean', default: true })
  available: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Court, (court) => court.timeSlots, {
    onDelete: 'CASCADE',
  })
  court: Court;

  @OneToMany(() => Booking, (booking) => booking.timeSlot)
  bookings: Booking[];
}
```

---

## 5. booking.entity.ts

```typescript
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './user.entity';
import { TimeSlot } from './timeslot.entity';

@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  userId: string;

  @Column({ type: 'uuid' })
  timeSlotId: string;

  @Column({
    type: 'enum',
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending',
  })
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  totalPrice: number;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.bookings, {
    onDelete: 'CASCADE',
  })
  user: User;

  @ManyToOne(() => TimeSlot, (timeSlot) => timeSlot.bookings, {
    onDelete: 'CASCADE',
  })
  timeSlot: TimeSlot;
}
```

---

## 6. tournament.entity.ts (Phase 2)

```typescript
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Facility } from './facility.entity';
import { TournamentParticipant } from './tournament-participant.entity';

@Entity('tournaments')
export class Tournament {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  facilityId: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'int' })
  maxParticipants: number;

  @Column({ type: 'int', default: 0 })
  currentParticipants: number;

  @Column({ type: 'timestamp' })
  startDate: Date;

  @Column({ type: 'timestamp' })
  endDate: Date;

  @Column({
    type: 'enum',
    enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
    default: 'upcoming',
  })
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Facility, (facility) => facility.tournaments, {
    onDelete: 'CASCADE',
  })
  facility: Facility;

  @OneToMany(
    () => TournamentParticipant,
    (participant) => participant.tournament,
  )
  participants: TournamentParticipant[];
}
```

---

## 7. tournament-participant.entity.ts (Phase 2)

```typescript
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Tournament } from './tournament.entity';
import { User } from './user.entity';

@Entity('tournament_participants')
export class TournamentParticipant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  tournamentId: string;

  @Column({ type: 'uuid' })
  userId: string;

  @CreateDateColumn()
  joinedAt: Date;

  @ManyToOne(() => Tournament, (tournament) => tournament.participants, {
    onDelete: 'CASCADE',
  })
  tournament: Tournament;

  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
  })
  user: User;
}
```

---

## Integration with AppModule

Update `apps/api/src/app.module.ts`:

```typescript
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './database/entities/user.entity';
import { Facility } from './database/entities/facility.entity';
import { Court } from './database/entities/court.entity';
import { TimeSlot } from './database/entities/timeslot.entity';
import { Booking } from './database/entities/booking.entity';
import { Tournament } from './database/entities/tournament.entity';
import { TournamentParticipant } from './database/entities/tournament-participant.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST || 'localhost',
      port: parseInt(process.env.DATABASE_PORT) || 5432,
      username: process.env.DATABASE_USER || 'canchaya',
      password: process.env.DATABASE_PASSWORD || 'canchaya',
      database: process.env.DATABASE_NAME || 'canchaya_db',
      entities: [User, Facility, Court, TimeSlot, Booking, Tournament, TournamentParticipant],
      synchronize: process.env.NODE_ENV === 'development',
      logging: process.env.NODE_ENV === 'development',
    }),
    // ... other modules
  ],
})
export class AppModule {}
```

---

## Running Migrations

### Generate migration (after schema changes):
```bash
yarn workspace @canchaya/api typeorm:generate --name InitialSchema
```

### Run migrations:
```bash
yarn workspace @canchaya/api typeorm:migrate
```

### Revert last migration:
```bash
yarn workspace @canchaya/api typeorm:revert
```

---

## PostGIS Queries

### Find nearby facilities (5km radius):
```sql
SELECT 
  id, name, address,
  ST_Distance(location::geography, ST_GeogFromText('POINT(-58.3816 -34.6037)')::geography) as distance_m
FROM facilities
WHERE ST_DWithin(location::geography, ST_GeogFromText('POINT(-58.3816 -34.6037)')::geography, 5000)
ORDER BY distance_m
LIMIT 20;
```

### Insert facility with location:
```sql
INSERT INTO facilities (name, address, city, location, owner_id)
VALUES (
  'Court A',
  'Av. Corrientes 123',
  'Buenos Aires',
  ST_GeogFromText('POINT(-58.3816 -34.6037)'),
  'owner-uuid'
);
```

---

## Views for Common Queries

Three views are created automatically:
1. `v_nearby_facilities` - For search queries
2. `v_facility_availability` - For booking availability
3. `v_facility_owner_dashboard` - For owner analytics

Use these in queries for better performance.

---

## Next Steps

1. Create the entity files in `apps/api/src/database/entities/`
2. Update `app.module.ts` with the TypeORM configuration
3. Add TypeORM CLI scripts to `apps/api/package.json`
4. Run `docker-compose up -d` to start PostgreSQL
5. Execute migrations or sync schema
6. Start the API with `yarn workspace @canchaya/api dev`
