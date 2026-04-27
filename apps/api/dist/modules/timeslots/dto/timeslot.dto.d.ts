export declare class CreateTimeSlotDto {
    startTime: Date;
    endTime: Date;
    price: number;
    available?: boolean;
}
export declare class UpdateTimeSlotDto {
    startTime?: Date;
    endTime?: Date;
    price?: number;
    available?: boolean;
}
export declare class TimeSlotResponseDto {
    id: string;
    courtId: string;
    startTime: Date;
    endTime: Date;
    price: number;
    available: boolean;
    createdAt: Date;
}
