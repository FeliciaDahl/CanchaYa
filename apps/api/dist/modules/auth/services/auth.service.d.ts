import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from '../../../database/entities/user.entity';
import { LoginDto, RegisterDto } from '../dto/auth.dto';
export declare class AuthService {
    private readonly userRepository;
    private readonly jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
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
    private generateTokens;
    validateUser(userId: string): Promise<User | null>;
}
