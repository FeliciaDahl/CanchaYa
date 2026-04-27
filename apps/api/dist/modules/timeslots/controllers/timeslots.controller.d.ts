import { TimeSlotsService } from '../services/timeslots.service';
import { CreateTimeSlotDto, UpdateTimeSlotDto } from '../dto/timeslot.dto';
export declare class TimeSlotsController {
    private readonly timeSlotsService;
    constructor(timeSlotsService: TimeSlotsService);
    createTimeSlot(courtId: string, facilityId: string, userId: string, createTimeSlotDto: CreateTimeSlotDto): Promise<{
        id: string;
        courtId: string;
        startTime: Date;
        endTime: Date;
        price: number;
        available: boolean;
        createdAt: Date;
    }>;
    getTimeSlot(timeSlotId: string): Promise<{
        id: string;
        courtId: string;
        startTime: Date;
        endTime: Date;
        price: number;
        available: boolean;
        createdAt: Date;
    }>;
    updateTimeSlot(timeSlotId: string, courtId: string, facilityId: string, userId: string, updateTimeSlotDto: UpdateTimeSlotDto): Promise<{
        id: string;
        courtId: string;
        startTime: Date;
        endTime: Date;
        price: number;
        available: boolean;
        createdAt: Date;
    }>;
    deleteTimeSlot(timeSlotId: string, courtId: string, facilityId: string, userId: string): Promise<void>;
    getCourtAvailability(courtId: string, startDate: string, endDate: string): Promise<{
        id: string;
        courtId: string;
        startTime: Date;
        endTime: Date;
        price: number;
        available: boolean;
        createdAt: Date;
    }[]>;
}
