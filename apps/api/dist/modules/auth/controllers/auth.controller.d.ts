import { AuthService } from '../services/auth.service';
import { LoginDto, RegisterDto } from '../dto/auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<{
        id: string;
        email: string;
        name: string;
        role: "player" | "facility_owner" | "admin";
        accessToken: string;
        refreshToken: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        id: string;
        email: string;
        name: string;
        role: "player" | "facility_owner" | "admin";
        accessToken: string;
        refreshToken: string;
    }>;
}
