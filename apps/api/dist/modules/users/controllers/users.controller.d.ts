import { UsersService } from '../services/users.service';
import { UpdateUserDto } from '../dto/user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
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
}
