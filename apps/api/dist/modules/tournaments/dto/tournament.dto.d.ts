export declare class CreateTournamentDto {
    name: string;
    description?: string;
    maxParticipants: number;
    startDate: Date;
    endDate: Date;
}
export declare class UpdateTournamentDto {
    name?: string;
    description?: string;
    maxParticipants?: number;
    status?: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
}
export declare class TournamentResponseDto {
    id: string;
    facilityId: string;
    name: string;
    description?: string;
    maxParticipants: number;
    currentParticipants: number;
    startDate: Date;
    endDate: Date;
    status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
    createdAt: Date;
}
