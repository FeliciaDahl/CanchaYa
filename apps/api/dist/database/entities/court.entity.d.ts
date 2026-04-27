import { Facility } from './facility.entity';
import { TimeSlot } from './timeslot.entity';
export declare class Court {
    id: string;
    facilityId: string;
    name: string;
    surface: 'clay' | 'artificial' | 'hard';
    hasLights: boolean;
    capacity: number;
    createdAt: Date;
    updatedAt: Date;
    facility: Facility;
    timeSlots: TimeSlot[];
}
