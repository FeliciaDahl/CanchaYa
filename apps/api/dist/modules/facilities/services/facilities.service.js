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
exports.FacilitiesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const facility_entity_1 = require("../../../database/entities/facility.entity");
let FacilitiesService = class FacilitiesService {
    constructor(facilityRepository) {
        this.facilityRepository = facilityRepository;
    }
    async createFacility(ownerId, createFacilityDto) {
        const { latitude, longitude, ...rest } = createFacilityDto;
        const facility = this.facilityRepository.create({
            ...rest,
            ownerId,
            location: {
                type: 'Point',
                coordinates: [longitude, latitude],
            },
        });
        const saved = await this.facilityRepository.save(facility);
        return this.toFacilityResponse(saved);
    }
    async getFacility(facilityId) {
        const facility = await this.facilityRepository.findOne({
            where: { id: facilityId },
            relations: ['owner'],
        });
        if (!facility) {
            throw new common_1.NotFoundException('Facility not found');
        }
        return this.toFacilityResponse(facility);
    }
    async updateFacility(facilityId, ownerId, updateFacilityDto) {
        const facility = await this.facilityRepository.findOne({
            where: { id: facilityId },
        });
        if (!facility) {
            throw new common_1.NotFoundException('Facility not found');
        }
        if (facility.ownerId !== ownerId) {
            throw new common_1.ForbiddenException('You do not own this facility');
        }
        const { latitude, longitude, ...rest } = updateFacilityDto;
        Object.assign(facility, rest);
        if (latitude !== undefined && longitude !== undefined) {
            facility.location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            };
        }
        const updated = await this.facilityRepository.save(facility);
        return this.toFacilityResponse(updated);
    }
    async deleteFacility(facilityId, ownerId) {
        const facility = await this.facilityRepository.findOne({
            where: { id: facilityId },
        });
        if (!facility) {
            throw new common_1.NotFoundException('Facility not found');
        }
        if (facility.ownerId !== ownerId) {
            throw new common_1.ForbiddenException('You do not own this facility');
        }
        await this.facilityRepository.remove(facility);
    }
    async getOwnerFacilities(ownerId) {
        const facilities = await this.facilityRepository.find({
            where: { ownerId },
        });
        return facilities.map((f) => this.toFacilityResponse(f));
    }
    async searchNearby(searchDto) {
        const { latitude, longitude, radiusKm = 5, limit = 20 } = searchDto;
        // Use PostGIS to find nearby facilities
        const query = this.facilityRepository
            .createQueryBuilder('facility')
            .select([
            'facility.id',
            'facility.ownerId',
            'facility.name',
            'facility.description',
            'facility.address',
            'facility.city',
            'facility.phone',
            'facility.website',
            'facility.imageUrls',
            'facility.createdAt',
        ])
            .addSelect(`ST_Distance(facility.location::geography, ST_GeogFromText('POINT(${longitude} ${latitude})')::geography)`, 'distance_m')
            .where(`ST_DWithin(facility.location::geography, ST_GeogFromText('POINT(${longitude} ${latitude})')::geography, ${radiusKm * 1000})`)
            .orderBy('distance_m', 'ASC')
            .limit(limit);
        const results = await query.getRawMany();
        return results.map((r) => ({
            ...r,
            location: {
                latitude,
                longitude,
            },
            distanceKm: (r.distance_m / 1000).toFixed(2),
        }));
    }
    toFacilityResponse(facility) {
        const coords = facility.location?.coordinates || [0, 0];
        return {
            id: facility.id,
            ownerId: facility.ownerId,
            name: facility.name,
            description: facility.description,
            address: facility.address,
            city: facility.city,
            latitude: coords[1],
            longitude: coords[0],
            phone: facility.phone,
            website: facility.website,
            imageUrls: facility.imageUrls || [],
            createdAt: facility.createdAt,
        };
    }
};
exports.FacilitiesService = FacilitiesService;
exports.FacilitiesService = FacilitiesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(facility_entity_1.Facility)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], FacilitiesService);
