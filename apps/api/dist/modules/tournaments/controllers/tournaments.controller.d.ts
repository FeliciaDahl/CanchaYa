import { TournamentsService } from '../services/tournaments.service';
import { CreateTournamentDto, UpdateTournamentDto } from '../dto/tournament.dto';
export declare class TournamentsController {
    private readonly tournamentsService;
    constructor(tournamentsService: TournamentsService);
    createTournament(facilityId: string, userId: string, createTournamentDto: CreateTournamentDto): Promise<{
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
    updateTournament(tournamentId: string, facilityId: string, userId: string, updateTournamentDto: UpdateTournamentDto): Promise<{
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
}
