import { Tournament } from './tournament.entity';
import { User } from './user.entity';
export declare class TournamentParticipant {
    id: string;
    tournamentId: string;
    userId: string;
    joinedAt: Date;
    tournament: Tournament;
    user: User;
}
