import { Repository } from 'typeorm';
import { Tournament } from '../../../database/entities/tournament.entity';
import { TournamentParticipant } from '../../../database/entities/tournament-participant.entity';
import { Facility } from '../../../database/entities/facility.entity';
import { CreateTournamentDto, UpdateTournamentDto } from '../dto/tournament.dto';
export declare class TournamentsService {
    private readonly tournamentRepository;
    private readonly participantRepository;
    private readonly facilityRepository;
    constructor(tournamentRepository: Repository<Tournament>, participantRepository: Repository<TournamentParticipant>, facilityRepository: Repository<Facility>);
    createTournament(facilityId: string, ownerId: string, createTournamentDto: CreateTournamentDto): Promise<{
        id: string;
        facilityId: string;
        name: string;
        description: string;
        maxParticipants: number;
        currentParticipants: number;
        startDate: Date;
        endDate: Date;
        status: "cancelled" | "completed" | "upcoming" | "ongoing";
        createdAt: Date;
    }>;
    getTournament(tournamentId: string): Promise<{
        id: string;
        facilityId: string;
        name: string;
        description: string;
        maxParticipants: number;
        currentParticipants: number;
        startDate: Date;
        endDate: Date;
        status: "cancelled" | "completed" | "upcoming" | "ongoing";
        createdAt: Date;
    }>;
    updateTournament(tournamentId: string, facilityId: string, ownerId: string, updateTournamentDto: UpdateTournamentDto): Promise<{
        id: string;
        facilityId: string;
        name: string;
        description: string;
        maxParticipants: number;
        currentParticipants: number;
        startDate: Date;
        endDate: Date;
        status: "cancelled" | "completed" | "upcoming" | "ongoing";
        createdAt: Date;
    }>;
    joinTournament(tournamentId: string, userId: string): Promise<{
        id: string;
        facilityId: string;
        name: string;
        description: string;
        maxParticipants: number;
        currentParticipants: number;
        startDate: Date;
        endDate: Date;
        status: "cancelled" | "completed" | "upcoming" | "ongoing";
        createdAt: Date;
    }>;
    private toTournamentResponse;
}
