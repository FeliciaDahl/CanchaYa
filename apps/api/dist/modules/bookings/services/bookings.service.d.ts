import { Repository } from 'typeorm';
import { Booking } from '../../../database/entities/booking.entity';
import { TimeSlot } from '../../../database/entities/timeslot.entity';
import { CreateBookingDto, UpdateBookingStatusDto } from '../dto/booking.dto';
export declare class BookingsService {
    private readonly bookingRepository;
    private readonly timeSlotRepository;
    constructor(bookingRepository: Repository<Booking>, timeSlotRepository: Repository<TimeSlot>);
    createBooking(userId: string, createBookingDto: CreateBookingDto): Promise<{
        id: string;
        userId: string;
        timeSlotId: string;
        status: "pending" | "confirmed" | "cancelled" | "completed";
        totalPrice: number;
        notes: string;
        createdAt: Date;
    }>;
    getBooking(bookingId: string, userId?: string): Promise<{
        id: string;
        userId: string;
        timeSlotId: string;
        status: "pending" | "confirmed" | "cancelled" | "completed";
        totalPrice: number;
        notes: string;
        createdAt: Date;
    }>;
    updateBookingStatus(bookingId: string, updateDto: UpdateBookingStatusDto, userId?: string): Promise<{
        id: string;
        userId: string;
        timeSlotId: string;
        status: "pending" | "confirmed" | "cancelled" | "completed";
        totalPrice: number;
        notes: string;
        createdAt: Date;
    }>;
    cancelBooking(bookingId: string, userId: string): Promise<{
        id: string;
        userId: string;
        timeSlotId: string;
        status: "pending" | "confirmed" | "cancelled" | "completed";
        totalPrice: number;
        notes: string;
        createdAt: Date;
    }>;
    getUserBookings(userId: string): Promise<{
        id: string;
        userId: string;
        timeSlotId: string;
        status: "pending" | "confirmed" | "cancelled" | "completed";
        totalPrice: number;
        notes: string;
        createdAt: Date;
    }[]>;
    getUpcomingBookings(userId: string): Promise<{
        id: string;
        userId: string;
        timeSlotId: string;
        status: "pending" | "confirmed" | "cancelled" | "completed";
        totalPrice: number;
        notes: string;
        createdAt: Date;
    }[]>;
    private toBookingResponse;
}
