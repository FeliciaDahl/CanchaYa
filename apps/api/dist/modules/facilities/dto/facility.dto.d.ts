export declare class CreateFacilityDto {
    name: string;
    description?: string;
    address: string;
    city: string;
    latitude: number;
    longitude: number;
    phone?: string;
    website?: string;
    imageUrls?: string[];
}
export declare class UpdateFacilityDto {
    name?: string;
    description?: string;
    address?: string;
    city?: string;
    latitude?: number;
    longitude?: number;
    phone?: string;
    website?: string;
    imageUrls?: string[];
}
export declare class SearchNearbyDto {
    latitude: number;
    longitude: number;
    radiusKm?: number;
    limit?: number;
}
export declare class FacilityResponseDto {
    id: string;
    ownerId: string;
    name: string;
    description?: string;
    address: string;
    city: string;
    latitude: number;
    longitude: number;
    phone?: string;
    website?: string;
    imageUrls: string[];
    createdAt: Date;
}
