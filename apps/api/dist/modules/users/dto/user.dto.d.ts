export declare class CreateUserDto {
    email: string;
    name: string;
    phone?: string;
    avatarUrl?: string;
}
export declare class UpdateUserDto {
    name?: string;
    phone?: string;
    avatarUrl?: string;
}
export declare class UserResponseDto {
    id: string;
    email: string;
    name: string;
    phone?: string;
    avatarUrl?: string;
    role: 'player' | 'facility_owner' | 'admin';
    emailVerified: boolean;
    createdAt: Date;
}
