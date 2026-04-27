import { BookingsService } from '../services/bookings.service';
import { CreateBookingDto, UpdateBookingStatusDto } from '../dto/booking.dto';
export declare class BookingsController {
    private readonly bookingsService;
    constructor(bookingsService: BookingsService);
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
    cancelBooking(bookingId: string, userId: string): Promise<void>;
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
}
