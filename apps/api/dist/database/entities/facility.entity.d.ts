import { User } from './user.entity';
import { Court } from './court.entity';
import { Tournament } from './tournament.entity';
import { Point } from 'geojson';
export declare class Facility {
    id: string;
    ownerId: string;
    name: string;
    description: string;
    address: string;
    city: string;
    location: Point;
    phone: string;
    website: string;
    imageUrls: string[];
    createdAt: Date;
    updatedAt: Date;
    owner: User;
    courts: Court[];
    tournaments: Tournament[];
}
