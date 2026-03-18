import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tournament } from '../../../database/entities/tournament.entity';
import { TournamentParticipant } from '../../../database/entities/tournament-participant.entity';
import { Facility } from '../../../database/entities/facility.entity';
import { CreateTournamentDto, UpdateTournamentDto } from '../dto/tournament.dto';

@Injectable()
export class TournamentsService {
  constructor(
    @InjectRepository(Tournament)
    private readonly tournamentRepository: Repository<Tournament>,
    @InjectRepository(TournamentParticipant)
    private readonly participantRepository: Repository<TournamentParticipant>,
    @InjectRepository(Facility)
    private readonly facilityRepository: Repository<Facility>,
  ) {}

  async createTournament(
    facilityId: string,
    ownerId: string,
    createTournamentDto: CreateTournamentDto,
  ) {
    const facility = await this.facilityRepository.findOne({
      where: { id: facilityId },
    });

    if (!facility || facility.ownerId !== ownerId) {
      throw new ForbiddenException('You do not own this facility');
    }

    if (createTournamentDto.startDate >= createTournamentDto.endDate) {
      throw new BadRequestException('End date must be after start date');
    }

    const tournament = this.tournamentRepository.create({
      ...createTournamentDto,
      facilityId,
    });

    const saved = await this.tournamentRepository.save(tournament);
    return this.toTournamentResponse(saved);
  }

  async getTournament(tournamentId: string) {
    const tournament = await this.tournamentRepository.findOne({
      where: { id: tournamentId },
    });

    if (!tournament) {
      throw new NotFoundException('Tournament not found');
    }

    return this.toTournamentResponse(tournament);
  }

  async updateTournament(
    tournamentId: string,
    facilityId: string,
    ownerId: string,
    updateTournamentDto: UpdateTournamentDto,
  ) {
    const facility = await this.facilityRepository.findOne({
      where: { id: facilityId },
    });

    if (!facility || facility.ownerId !== ownerId) {
      throw new ForbiddenException('You do not own this facility');
    }

    const tournament = await this.tournamentRepository.findOne({
      where: { id: tournamentId, facilityId },
    });

    if (!tournament) {
      throw new NotFoundException('Tournament not found');
    }

    Object.assign(tournament, updateTournamentDto);
    const updated = await this.tournamentRepository.save(tournament);
    return this.toTournamentResponse(updated);
  }

  async joinTournament(tournamentId: string, userId: string) {
    const tournament = await this.tournamentRepository.findOne({
      where: { id: tournamentId },
    });

    if (!tournament) {
      throw new NotFoundException('Tournament not found');
    }

    if (tournament.currentParticipants >= tournament.maxParticipants) {
      throw new BadRequestException('Tournament is full');
    }

    const existingParticipant = await this.participantRepository.findOne({
      where: { tournamentId, userId },
    });

    if (existingParticipant) {
      throw new BadRequestException('You are already registered for this tournament');
    }

    const participant = this.participantRepository.create({
      tournamentId,
      userId,
    });

    tournament.currentParticipants += 1;
    await this.tournamentRepository.save(tournament);
    await this.participantRepository.save(participant);

    return this.toTournamentResponse(tournament);
  }

  private toTournamentResponse(tournament: Tournament) {
    return {
      id: tournament.id,
      facilityId: tournament.facilityId,
      name: tournament.name,
      description: tournament.description,
      maxParticipants: tournament.maxParticipants,
      currentParticipants: tournament.currentParticipants,
      startDate: tournament.startDate,
      endDate: tournament.endDate,
      status: tournament.status,
      createdAt: tournament.createdAt,
    };
  }
}
