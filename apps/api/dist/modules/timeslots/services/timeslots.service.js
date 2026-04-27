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
exports.TimeSlotsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const timeslot_entity_1 = require("../../../database/entities/timeslot.entity");
const court_entity_1 = require("../../../database/entities/court.entity");
const facility_entity_1 = require("../../../database/entities/facility.entity");
let TimeSlotsService = class TimeSlotsService {
    constructor(timeSlotRepository, courtRepository, facilityRepository) {
        this.timeSlotRepository = timeSlotRepository;
        this.courtRepository = courtRepository;
        this.facilityRepository = facilityRepository;
    }
    async createTimeSlot(courtId, facilityId, ownerId, createTimeSlotDto) {
        // Verify facility ownership
        const facility = await this.facilityRepository.findOne({
            where: { id: facilityId },
        });
        if (!facility || facility.ownerId !== ownerId) {
            throw new common_1.ForbiddenException('You do not own this facility');
        }
        // Verify court belongs to facility
        const court = await this.courtRepository.findOne({
            where: { id: courtId, facilityId },
        });
        if (!court) {
            throw new common_1.NotFoundException('Court not found in this facility');
        }
        if (createTimeSlotDto.startTime >= createTimeSlotDto.endTime) {
            throw new common_1.BadRequestException('End time must be after start time');
        }
        const timeSlot = this.timeSlotRepository.create({
            ...createTimeSlotDto,
            courtId,
        });
        const saved = await this.timeSlotRepository.save(timeSlot);
        return this.toTimeSlotResponse(saved);
    }
    async getTimeSlot(timeSlotId) {
        const timeSlot = await this.timeSlotRepository.findOne({
            where: { id: timeSlotId },
        });
        if (!timeSlot) {
            throw new common_1.NotFoundException('Time slot not found');
        }
        return this.toTimeSlotResponse(timeSlot);
    }
    async updateTimeSlot(timeSlotId, courtId, facilityId, ownerId, updateTimeSlotDto) {
        // Verify ownership
        const facility = await this.facilityRepository.findOne({
            where: { id: facilityId },
        });
        if (!facility || facility.ownerId !== ownerId) {
            throw new common_1.ForbiddenException('You do not own this facility');
        }
        const timeSlot = await this.timeSlotRepository.findOne({
            where: { id: timeSlotId, courtId },
        });
        if (!timeSlot) {
            throw new common_1.NotFoundException('Time slot not found');
        }
        if (updateTimeSlotDto.startTime && updateTimeSlotDto.endTime) {
            if (updateTimeSlotDto.startTime >= updateTimeSlotDto.endTime) {
                throw new common_1.BadRequestException('End time must be after start time');
            }
        }
        Object.assign(timeSlot, updateTimeSlotDto);
        const updated = await this.timeSlotRepository.save(timeSlot);
        return this.toTimeSlotResponse(updated);
    }
    async deleteTimeSlot(timeSlotId, courtId, facilityId, ownerId) {
        const facility = await this.facilityRepository.findOne({
            where: { id: facilityId },
        });
        if (!facility || facility.ownerId !== ownerId) {
            throw new common_1.ForbiddenException('You do not own this facility');
        }
        const timeSlot = await this.timeSlotRepository.findOne({
            where: { id: timeSlotId, courtId },
        });
        if (!timeSlot) {
            throw new common_1.NotFoundException('Time slot not found');
        }
        await this.timeSlotRepository.remove(timeSlot);
    }
    async getCourtAvailability(courtId, startDate, endDate) {
        const timeSlots = await this.timeSlotRepository.find({
            where: {
                courtId,
                startTime: (0, typeorm_2.Between)(startDate, endDate),
            },
            order: { startTime: 'ASC' },
        });
        return timeSlots.map((ts) => this.toTimeSlotResponse(ts));
    }
    toTimeSlotResponse(timeSlot) {
        return {
            id: timeSlot.id,
            courtId: timeSlot.courtId,
            startTime: timeSlot.startTime,
            endTime: timeSlot.endTime,
            price: timeSlot.price,
            available: timeSlot.available,
            createdAt: timeSlot.createdAt,
        };
    }
};
exports.TimeSlotsService = TimeSlotsService;
exports.TimeSlotsService = TimeSlotsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(timeslot_entity_1.TimeSlot)),
    __param(1, (0, typeorm_1.InjectRepository)(court_entity_1.Court)),
    __param(2, (0, typeorm_1.InjectRepository)(facility_entity_1.Facility)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], TimeSlotsService);
