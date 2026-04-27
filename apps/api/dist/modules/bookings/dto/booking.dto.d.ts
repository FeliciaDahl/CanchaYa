export declare class CreateBookingDto {
    timeSlotId: string;
    notes?: string;
}
export declare class UpdateBookingStatusDto {
    status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
    notes?: string;
}
export declare class BookingResponseDto {
    id: string;
    userId: string;
    timeSlotId: string;
    status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
    totalPrice: number;
    notes?: string;
    createdAt: Date;
}
