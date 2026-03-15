import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  User,
  Facility,
  Court,
  TimeSlot,
  Booking,
  Tournament,
  TournamentParticipant,
} from './database/entities';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { FacilitiesModule } from './modules/facilities/facilities.module';
import { CourtsModule } from './modules/courts/courts.module';
import { TimeSlotsModule } from './modules/timeslots/timeslots.module';
import { BookingsModule } from './modules/bookings/bookings.module';
import { TournamentsModule } from './modules/tournaments/tournaments.module';
import { WebSocketGatewayImpl } from './modules/websocket/websocket.gateway';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST || 'localhost',
      port: parseInt(process.env.DATABASE_PORT || '5432'),
      username: process.env.DATABASE_USER || 'canchaya',
      password: process.env.DATABASE_PASSWORD || 'canchaya',
      database: process.env.DATABASE_NAME || 'canchaya_db',
      entities: [
        User,
        Facility,
        Court,
        TimeSlot,
        Booking,
        Tournament,
        TournamentParticipant,
      ],
      synchronize: process.env.NODE_ENV === 'development',
      logging: process.env.NODE_ENV === 'development',
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    }),
    AuthModule,
    UsersModule,
    FacilitiesModule,
    CourtsModule,
    TimeSlotsModule,
    BookingsModule,
    TournamentsModule,
  ],
  controllers: [],
  providers: [WebSocketGatewayImpl],
})
export class AppModule {}
