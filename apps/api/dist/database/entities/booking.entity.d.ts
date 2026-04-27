import { User } from './user.entity';
import { TimeSlot } from './timeslot.entity';
export declare class Booking {
    id: string;
    userId: string;
    timeSlotId: string;
    status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
    totalPrice: number;
    notes: string;
    createdAt: Date;
    updatedAt: Date;
    user: User;
    timeSlot: TimeSlot;
}
