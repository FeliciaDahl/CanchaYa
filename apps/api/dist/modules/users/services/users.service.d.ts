import { Repository } from 'typeorm';
import { User } from '../../../database/entities/user.entity';
import { UpdateUserDto } from '../dto/user.dto';
export declare class UsersService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    getUser(userId: string): Promise<{
        id: string;
        email: string;
        name: string;
        phone: string;
        avatarUrl: string;
        role: "player" | "facility_owner" | "admin";
        emailVerified: boolean;
        createdAt: Date;
    }>;
    getUserByEmail(email: string): Promise<User | null>;
    updateUser(userId: string, updateUserDto: UpdateUserDto): Promise<{
        id: string;
        email: string;
        name: string;
        phone: string;
        avatarUrl: string;
        role: "player" | "facility_owner" | "admin";
        emailVerified: boolean;
        createdAt: Date;
    }>;
    promoteToFacilityOwner(userId: string): Promise<{
        id: string;
        email: string;
        name: string;
        phone: string;
        avatarUrl: string;
        role: "player" | "facility_owner" | "admin";
        emailVerified: boolean;
        createdAt: Date;
    }>;
    verifyEmail(userId: string): Promise<void>;
    private toUserResponse;
}
