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
exports.FacilitiesController = void 0;
const common_1 = require("@nestjs/common");
const facilities_service_1 = require("../services/facilities.service");
const facility_dto_1 = require("../dto/facility.dto");
let FacilitiesController = class FacilitiesController {
    constructor(facilitiesService) {
        this.facilitiesService = facilitiesService;
    }
    async createFacility(createFacilityDto, userId) {
        return this.facilitiesService.createFacility(userId, createFacilityDto);
    }
    async getFacility(facilityId) {
        return this.facilitiesService.getFacility(facilityId);
    }
    async updateFacility(facilityId, updateFacilityDto, userId) {
        return this.facilitiesService.updateFacility(facilityId, userId, updateFacilityDto);
    }
    async deleteFacility(facilityId, userId) {
        await this.facilitiesService.deleteFacility(facilityId, userId);
    }
    async getOwnerFacilities(ownerId) {
        return this.facilitiesService.getOwnerFacilities(ownerId);
    }
    async searchNearby(searchDto) {
        return this.facilitiesService.searchNearby(searchDto);
    }
};
exports.FacilitiesController = FacilitiesController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(201),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Query)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [facility_dto_1.CreateFacilityDto, String]),
    __metadata("design:returntype", Promise)
], FacilitiesController.prototype, "createFacility", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FacilitiesController.prototype, "getFacility", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Query)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, facility_dto_1.UpdateFacilityDto, String]),
    __metadata("design:returntype", Promise)
], FacilitiesController.prototype, "updateFacility", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], FacilitiesController.prototype, "deleteFacility", null);
__decorate([
    (0, common_1.Get)('owner/:ownerId'),
    __param(0, (0, common_1.Param)('ownerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FacilitiesController.prototype, "getOwnerFacilities", null);
__decorate([
    (0, common_1.Post)('search/nearby'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [facility_dto_1.SearchNearbyDto]),
    __metadata("design:returntype", Promise)
], FacilitiesController.prototype, "searchNearby", null);
exports.FacilitiesController = FacilitiesController = __decorate([
    (0, common_1.Controller)('facilities'),
    __metadata("design:paramtypes", [facilities_service_1.FacilitiesService])
], FacilitiesController);
