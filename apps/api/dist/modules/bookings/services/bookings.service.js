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
exports.BookingsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const booking_entity_1 = require("../../../database/entities/booking.entity");
const timeslot_entity_1 = require("../../../database/entities/timeslot.entity");
let BookingsService = class BookingsService {
    constructor(bookingRepository, timeSlotRepository) {
        this.bookingRepository = bookingRepository;
        this.timeSlotRepository = timeSlotRepository;
    }
    async createBooking(userId, createBookingDto) {
        const { timeSlotId, notes } = createBookingDto;
        // Get time slot with pricing
        const timeSlot = await this.timeSlotRepository.findOne({
            where: { id: timeSlotId },
        });
        if (!timeSlot) {
            throw new common_1.NotFoundException('Time slot not found');
        }
        if (!timeSlot.available) {
            throw new common_1.BadRequestException('Time slot is not available');
        }
        // Check if user already has booking for this slot
        const existingBooking = await this.bookingRepository.findOne({
            where: { userId, timeSlotId },
        });
        if (existingBooking) {
            throw new common_1.BadRequestException('You already have a booking for this time slot');
        }
        const booking = this.bookingRepository.create({
            userId,
            timeSlotId,
            totalPrice: Number(timeSlot.price),
            status: 'pending',
            notes,
        });
        const saved = await this.bookingRepository.save(booking);
        return this.toBookingResponse(saved);
    }
    async getBooking(bookingId, userId) {
        const booking = await this.bookingRepository.findOne({
            where: { id: bookingId },
        });
        if (!booking) {
            throw new common_1.NotFoundException('Booking not found');
        }
        if (userId && booking.userId !== userId) {
            throw new common_1.ForbiddenException('You do not have access to this booking');
        }
        return this.toBookingResponse(booking);
    }
    async updateBookingStatus(bookingId, updateDto, userId) {
        const booking = await this.bookingRepository.findOne({
            where: { id: bookingId },
        });
        if (!booking) {
            throw new common_1.NotFoundException('Booking not found');
        }
        // If userId provided, only allow booking owner to update
        if (userId && booking.userId !== userId) {
            throw new common_1.ForbiddenException('You cannot update this booking');
        }
        booking.status = updateDto.status;
        if (updateDto.notes) {
            booking.notes = updateDto.notes;
        }
        const updated = await this.bookingRepository.save(booking);
        return this.toBookingResponse(updated);
    }
    async cancelBooking(bookingId, userId) {
        const booking = await this.bookingRepository.findOne({
            where: { id: bookingId },
        });
        if (!booking) {
            throw new common_1.NotFoundException('Booking not found');
        }
        if (booking.userId !== userId) {
            throw new common_1.ForbiddenException('You can only cancel your own bookings');
        }
        if (booking.status === 'cancelled') {
            throw new common_1.BadRequestException('Booking is already cancelled');
        }
        booking.status = 'cancelled';
        const updated = await this.bookingRepository.save(booking);
        return this.toBookingResponse(updated);
    }
    async getUserBookings(userId) {
        const bookings = await this.bookingRepository.find({
            where: { userId },
            order: { createdAt: 'DESC' },
        });
        return bookings.map((b) => this.toBookingResponse(b));
    }
    async getUpcomingBookings(userId) {
        const now = new Date();
        const bookings = await this.bookingRepository
            .createQueryBuilder('booking')
            .leftJoinAndSelect('booking.timeSlot', 'timeSlot')
            .where('booking.userId = :userId', { userId })
            .andWhere('booking.status IN (:...statuses)', {
            statuses: ['pending', 'confirmed'],
        })
            .andWhere('timeSlot.startTime > :now', { now })
            .orderBy('timeSlot.startTime', 'ASC')
            .getMany();
        return bookings.map((b) => this.toBookingResponse(b));
    }
    toBookingResponse(booking) {
        return {
            id: booking.id,
            userId: booking.userId,
            timeSlotId: booking.timeSlotId,
            status: booking.status,
            totalPrice: Number(booking.totalPrice),
            notes: booking.notes,
            createdAt: booking.createdAt,
        };
    }
};
exports.BookingsService = BookingsService;
exports.BookingsService = BookingsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(booking_entity_1.Booking)),
    __param(1, (0, typeorm_1.InjectRepository)(timeslot_entity_1.TimeSlot)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], BookingsService);
