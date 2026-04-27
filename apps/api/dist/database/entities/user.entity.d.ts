import { Facility } from './facility.entity';
import { Booking } from './booking.entity';
export declare class User {
    id: string;
    email: string;
    passwordHash: string;
    name: string;
    phone: string;
    avatarUrl: string;
    role: 'player' | 'facility_owner' | 'admin';
    oauthProvider: 'google' | 'apple' | null;
    oauthId: string;
    emailVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
    facilities: Facility[];
    bookings: Booking[];
}
