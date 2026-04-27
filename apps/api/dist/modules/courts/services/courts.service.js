"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourtsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const court_entity_1 = require("../../../database/entities/court.entity");
const facility_entity_1 = require("../../../database/entities/facility.entity");
let CourtsService = class CourtsService {
    constructor(courtRepository, facilityRepository) {
        this.courtRepository = courtRepository;
        this.facilityRepository = facilityRepository;
    }
    async createCourt(facilityId, ownerId, createCourtDto) {
        const facility = await this.facilityRepository.findOne({
            where: { id: facilityId },
        });
        if (!facility) {
            throw new common_1.NotFoundException('Facility not found');
        }
        if (facility.ownerId !== ownerId) {
            throw new common_1.ForbiddenException('You do not own this facility');
        }
        const court = this.courtRepository.create({
            ...createCourtDto,
            facilityId,
        });
        const saved = await this.courtRepository.save(court);
        return this.toCourtResponse(saved);
    }
    async getCourt(courtId) {
        const court = await this.courtRepository.findOne({
            where: { id: courtId },
        });
        if (!court) {
            throw new common_1.NotFoundException('Court not found');
        }
        return this.toCourtResponse(court);
    }
    async updateCourt(courtId, facilityId, ownerId, updateCourtDto) {
        const facility = await this.facilityRepository.findOne({
            where: { id: facilityId },
        });
        if (!facility || facility.ownerId !== ownerId) {
            throw new common_1.ForbiddenException('You do not own this facility');
        }
        const court = await this.courtRepository.findOne({
            where: { id: courtId, facilityId },
        });
        if (!court) {
            throw new common_1.NotFoundException('Court not found');
        }
        Object.assign(court, updateCourtDto);
        const updated = await this.courtRepository.save(court);
        return this.toCourtResponse(updated);
    }
    async deleteCourt(courtId, facilityId, ownerId) {
        const facility = await this.facilityRepository.findOne({
            where: { id: facilityId },
        });
        if (!facility || facility.ownerId !== ownerId) {
            throw new common_1.ForbiddenException('You do not own this facility');
        }
        const court = await this.courtRepository.findOne({
            where: { id: courtId, facilityId },
        });
        if (!court) {
            throw new common_1.NotFoundException('Court not found');
        }
        await this.courtRepository.remove(court);
    }
    async getFacilityCourts(facilityId) {
        const courts = await this.courtRepository.find({
            where: { facilityId },
        });
        return courts.map((c) => this.toCourtResponse(c));
    }
    toCourtResponse(court) {
        return {
            id: court.id,
            facilityId: court.facilityId,
            name: court.name,
            surface: court.surface,
            hasLights: court.hasLights,
            capacity: court.capacity,
            createdAt: court.createdAt,
        };
    }
};
exports.CourtsService = CourtsService;
exports.CourtsService = CourtsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(court_entity_1.Court)),
    __param(1, (0, typeorm_1.InjectRepository)(facility_entity_1.Facility)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CourtsService);
