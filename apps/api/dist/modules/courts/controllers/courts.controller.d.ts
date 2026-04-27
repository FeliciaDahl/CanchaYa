import { CourtsService } from '../services/courts.service';
import { CreateCourtDto, UpdateCourtDto } from '../dto/court.dto';
export declare class CourtsController {
    private readonly courtsService;
    constructor(courtsService: CourtsService);
    createCourt(facilityId: string, userId: string, createCourtDto: CreateCourtDto): Promise<{
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
    updateCourt(courtId: string, facilityId: string, userId: string, updateCourtDto: UpdateCourtDto): Promise<{
        id: string;
        facilityId: string;
        name: string;
        surface: "clay" | "artificial" | "hard";
        hasLights: boolean;
        capacity: number;
        createdAt: Date;
    }>;
    deleteCourt(courtId: string, facilityId: string, userId: string): Promise<void>;
    getFacilityCourts(facilityId: string): Promise<{
        id: string;
        facilityId: string;
        name: string;
        surface: "clay" | "artificial" | "hard";
        hasLights: boolean;
        capacity: number;
        createdAt: Date;
    }[]>;
}
