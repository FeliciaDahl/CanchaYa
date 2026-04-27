import { Repository } from 'typeorm';
import { Court } from '../../../database/entities/court.entity';
import { Facility } from '../../../database/entities/facility.entity';
import { CreateCourtDto, UpdateCourtDto } from '../dto/court.dto';
export declare class CourtsService {
    private readonly courtRepository;
    private readonly facilityRepository;
    constructor(courtRepository: Repository<Court>, facilityRepository: Repository<Facility>);
    createCourt(facilityId: string, ownerId: string, createCourtDto: CreateCourtDto): Promise<{
        id: string;
        facilityId: string;
        name: string;
        surface: "clay" | "artificial" | "hard";
        hasLights: boolean;
        capacity: number;
        createdAt: Date;
    }>;
    getCourt(courtId: string): Promise<{
        id: string;
        facilityId: string;
        name: string;
        surface: "clay" | "artificial" | "hard";
        hasLights: boolean;
        capacity: number;
        createdAt: Date;
    }>;
    updateCourt(courtId: string, facilityId: string, ownerId: string, updateCourtDto: UpdateCourtDto): Promise<{
        id: string;
        facilityId: string;
        name: string;
        surface: "clay" | "artificial" | "hard";
        hasLights: boolean;
        capacity: number;
        createdAt: Date;
    }>;
    deleteCourt(courtId: string, facilityId: string, ownerId: string): Promise<void>;
    getFacilityCourts(facilityId: string): Promise<{
        id: string;
        facilityId: string;
        name: string;
        surface: "clay" | "artificial" | "hard";
        hasLights: boolean;
        capacity: number;
        createdAt: Date;
    }[]>;
    private toCourtResponse;
}
