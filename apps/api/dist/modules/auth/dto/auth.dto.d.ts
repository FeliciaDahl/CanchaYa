export declare class RegisterDto {
    email: string;
    password: string;
    name: string;
}
export declare class LoginDto {
    email: string;
    password: string;
}
export declare class AuthResponseDto {
    id: string;
    email: string;
    name: string;
    role: 'player' | 'facility_owner' | 'admin';
    accessToken: string;
    refreshToken?: string;
}
