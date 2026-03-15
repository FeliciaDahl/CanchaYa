import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Query,
  HttpCode,
} from '@nestjs/common';
import { TournamentsService } from '../services/tournaments.service';
import { CreateTournamentDto, UpdateTournamentDto } from '../dto/tournament.dto';

@Controller('tournaments')
export class TournamentsController {
  constructor(private readonly tournamentsService: TournamentsService) {}

  @Post()
  @HttpCode(201)
  async createTournament(
    @Query('facilityId') facilityId: string,
    @Query('userId') userId: string,
    @Body() createTournamentDto: CreateTournamentDto,
  ) {
    return this.tournamentsService.createTournament(
      facilityId,
      userId,
      createTournamentDto,
    );
  }

  @Get(':id')
  async getTournament(@Param('id') tournamentId: string) {
    return this.tournamentsService.getTournament(tournamentId);
  }

  @Put(':id')
  async updateTournament(
    @Param('id') tournamentId: string,
    @Query('facilityId') facilityId: string,
    @Query('userId') userId: string,
    @Body() updateTournamentDto: UpdateTournamentDto,
  ) {
    return this.tournamentsService.updateTournament(
      tournamentId,
      facilityId,
      userId,
      updateTournamentDto,
    );
  }

  @Post(':id/join')
  async joinTournament(
    @Param('id') tournamentId: string,
    @Query('userId') userId: string,
  ) {
    return this.tournamentsService.joinTournament(tournamentId, userId);
  }
}
