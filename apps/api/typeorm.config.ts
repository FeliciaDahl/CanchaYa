import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { User } from './src/database/entities/user.entity';
import { Facility } from './src/database/entities/facility.entity';
import { Court } from './src/database/entities/court.entity';
import { TimeSlot } from './src/database/entities/timeslot.entity';
import { Booking } from './src/database/entities/booking.entity';
import { Tournament } from './src/database/entities/tournament.entity';
import { TournamentParticipant } from './src/database/entities/tournament-participant.entity';

dotenv.config();

const port = process.env.DATABASE_PORT ? parseInt(process.env.DATABASE_PORT, 10) : 5432;

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: port,
  username: process.env.DATABASE_USER || 'canchaya',
  password: process.env.DATABASE_PASSWORD || 'canchaya',
  database: process.env.DATABASE_NAME || 'canchaya_db',
  synchronize: false,
  logging: process.env.NODE_ENV === 'development',
  entities: [User, Facility, Court, TimeSlot, Booking, Tournament, TournamentParticipant],
  migrations: ['src/database/migrations/*.ts'],
  subscribers: [],
});

// For CLI commands
export default AppDataSource;
