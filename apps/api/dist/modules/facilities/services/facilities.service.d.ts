import { Repository } from 'typeorm';
import { Facility } from '../../../database/entities/facility.entity';
import { CreateFacilityDto, UpdateFacilityDto, SearchNearbyDto } from '../dto/facility.dto';
export declare class FacilitiesService {
    private readonly facilityRepository;
    constructor(facilityRepository: Repository<Facility>);
    createFacility(ownerId: string, createFacilityDto: CreateFacilityDto): Promise<{
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
    updateFacility(facilityId: string, ownerId: string, updateFacilityDto: UpdateFacilityDto): Promise<{
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
    deleteFacility(facilityId: string, ownerId: string): Promise<void>;
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
    private toFacilityResponse;
}
