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
exports.TimeSlotsController = void 0;
const common_1 = require("@nestjs/common");
const timeslots_service_1 = require("../services/timeslots.service");
const timeslot_dto_1 = require("../dto/timeslot.dto");
let TimeSlotsController = class TimeSlotsController {
    constructor(timeSlotsService) {
        this.timeSlotsService = timeSlotsService;
    }
    async createTimeSlot(courtId, facilityId, userId, createTimeSlotDto) {
        return this.timeSlotsService.createTimeSlot(courtId, facilityId, userId, createTimeSlotDto);
    }
    async getTimeSlot(timeSlotId) {
        return this.timeSlotsService.getTimeSlot(timeSlotId);
    }
    async updateTimeSlot(timeSlotId, courtId, facilityId, userId, updateTimeSlotDto) {
        return this.timeSlotsService.updateTimeSlot(timeSlotId, courtId, facilityId, userId, updateTimeSlotDto);
    }
    async deleteTimeSlot(timeSlotId, courtId, facilityId, userId) {
        await this.timeSlotsService.deleteTimeSlot(timeSlotId, courtId, facilityId, userId);
    }
    async getCourtAvailability(courtId, startDate, endDate) {
        return this.timeSlotsService.getCourtAvailability(courtId, new Date(startDate), new Date(endDate));
    }
};
exports.TimeSlotsController = TimeSlotsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(201),
    __param(0, (0, common_1.Query)('courtId')),
    __param(1, (0, common_1.Query)('facilityId')),
    __param(2, (0, common_1.Query)('userId')),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, timeslot_dto_1.CreateTimeSlotDto]),
    __metadata("design:returntype", Promise)
], TimeSlotsController.prototype, "createTimeSlot", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TimeSlotsController.prototype, "getTimeSlot", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('courtId')),
    __param(2, (0, common_1.Query)('facilityId')),
    __param(3, (0, common_1.Query)('userId')),
    __param(4, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, timeslot_dto_1.UpdateTimeSlotDto]),
    __metadata("design:returntype", Promise)
], TimeSlotsController.prototype, "updateTimeSlot", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('courtId')),
    __param(2, (0, common_1.Query)('facilityId')),
    __param(3, (0, common_1.Query)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], TimeSlotsController.prototype, "deleteTimeSlot", null);
__decorate([
    (0, common_1.Get)('court/:courtId/availability'),
    __param(0, (0, common_1.Param)('courtId')),
    __param(1, (0, common_1.Query)('startDate')),
    __param(2, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], TimeSlotsController.prototype, "getCourtAvailability", null);
exports.TimeSlotsController = TimeSlotsController = __decorate([
    (0, common_1.Controller)('timeslots'),
    __metadata("design:paramtypes", [timeslots_service_1.TimeSlotsService])
], TimeSlotsController);
