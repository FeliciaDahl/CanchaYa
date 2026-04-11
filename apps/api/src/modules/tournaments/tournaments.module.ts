import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tournament, TournamentParticipant, Facility } from '../../../database/entities';
import { TournamentsService } from './services/tournaments.service';
import { TournamentsController } from './controllers/tournaments.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tournament, TournamentParticipant, Facility]),
  ],
  providers: [TournamentsService],
  controllers: [TournamentsController],
  exports: [TournamentsService],
})
export class TournamentsModule {}
