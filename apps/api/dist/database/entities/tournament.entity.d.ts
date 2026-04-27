import { Facility } from './facility.entity';
import { TournamentParticipant } from './tournament-participant.entity';
export declare class Tournament {
    id: string;
    facilityId: string;
    name: string;
    description: string;
    maxParticipants: number;
    currentParticipants: number;
    startDate: Date;
    endDate: Date;
    status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
    createdAt: Date;
    updatedAt: Date;
    facility: Facility;
    participants: TournamentParticipant[];
}
