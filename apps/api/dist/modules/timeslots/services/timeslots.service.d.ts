import { Repository } from 'typeorm';
import { TimeSlot } from '../../../database/entities/timeslot.entity';
import { Court } from '../../../database/entities/court.entity';
import { Facility } from '../../../database/entities/facility.entity';
import { CreateTimeSlotDto, UpdateTimeSlotDto } from '../dto/timeslot.dto';
export declare class TimeSlotsService {
    private readonly timeSlotRepository;
    private readonly courtRepository;
    private readonly facilityRepository;
    constructor(timeSlotRepository: Repository<TimeSlot>, courtRepository: Repository<Court>, facilityRepository: Repository<Facility>);
    createTimeSlot(courtId: string, facilityId: string, ownerId: string, createTimeSlotDto: CreateTimeSlotDto): Promise<{
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
    updateTimeSlot(timeSlotId: string, courtId: string, facilityId: string, ownerId: string, updateTimeSlotDto: UpdateTimeSlotDto): Promise<{
        id: string;
        courtId: string;
        startTime: Date;
        endTime: Date;
        price: number;
        available: boolean;
        createdAt: Date;
    }>;
    deleteTimeSlot(timeSlotId: string, courtId: string, facilityId: string, ownerId: string): Promise<void>;
    getCourtAvailability(courtId: string, startDate: Date, endDate: Date): Promise<{
        id: string;
        courtId: string;
        startTime: Date;
        endTime: Date;
        price: number;
        available: boolean;
        createdAt: Date;
    }[]>;
    private toTimeSlotResponse;
}
