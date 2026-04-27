export declare class CreateCourtDto {
    name: string;
    surface: 'clay' | 'artificial' | 'hard';
    hasLights: boolean;
    capacity: number;
}
export declare class UpdateCourtDto {
    name?: string;
    surface?: 'clay' | 'artificial' | 'hard';
    hasLights?: boolean;
    capacity?: number;
}
export declare class CourtResponseDto {
    id: string;
    facilityId: string;
    name: string;
    surface: 'clay' | 'artificial' | 'hard';
    hasLights: boolean;
    capacity: number;
    createdAt: Date;
}
