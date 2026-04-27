import { Court } from './court.entity';
import { Booking } from './booking.entity';
export declare class TimeSlot {
    id: string;
    courtId: string;
    startTime: Date;
    endTime: Date;
    price: number;
    available: boolean;
    createdAt: Date;
    updatedAt: Date;
    court: Court;
    bookings: Booking[];
}
