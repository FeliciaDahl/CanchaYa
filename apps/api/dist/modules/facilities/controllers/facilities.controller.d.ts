import { FacilitiesService } from '../services/facilities.service';
import { CreateFacilityDto, UpdateFacilityDto, SearchNearbyDto } from '../dto/facility.dto';
export declare class FacilitiesController {
    private readonly facilitiesService;
    constructor(facilitiesService: FacilitiesService);
    createFacility(createFacilityDto: CreateFacilityDto, userId: string): Promise<{
        id: string;
        ownerId: string;
        name: string;
        description: string;
        address: string;
        city: string;
        latitude: number;
        longitude: number;
        phone: string;
        website: string;
        imageUrls: string[];
        createdAt: Date;
    }>;
    getFacility(facilityId: string): Promise<{
        id: string;
        ownerId: string;
        name: string;
        description: string;
        address: string;
        city: string;
        latitude: number;
        longitude: number;
        phone: string;
        website: string;
        imageUrls: string[];
        createdAt: Date;
    }>;
    updateFacility(facilityId: string, updateFacilityDto: UpdateFacilityDto, userId: string): Promise<{
        id: string;
        ownerId: string;
        name: string;
        description: string;
        address: string;
        city: string;
        latitude: number;
        longitude: number;
        phone: string;
        website: string;
        imageUrls: string[];
        createdAt: Date;
    }>;
    deleteFacility(facilityId: string, userId: string): Promise<void>;
    getOwnerFacilities(ownerId: string): Promise<{
        id: string;
        ownerId: string;
        name: string;
        description: string;
        address: string;
        city: string;
        latitude: number;
        longitude: number;
        phone: string;
        website: string;
        imageUrls: string[];
        createdAt: Date;
    }[]>;
    searchNearby(searchDto: SearchNearbyDto): Promise<any[]>;
}
