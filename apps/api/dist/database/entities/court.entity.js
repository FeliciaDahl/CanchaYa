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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Court = void 0;
const typeorm_1 = require("typeorm");
const facility_entity_1 = require("./facility.entity");
const timeslot_entity_1 = require("./timeslot.entity");
let Court = class Court {
};
exports.Court = Court;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Court.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], Court.prototype, "facilityId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], Court.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['clay', 'artificial', 'hard'],
    }),
    __metadata("design:type", String)
], Court.prototype, "surface", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], Court.prototype, "hasLights", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 4 }),
    __metadata("design:type", Number)
], Court.prototype, "capacity", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Court.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Court.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => facility_entity_1.Facility, (facility) => facility.courts, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", facility_entity_1.Facility)
], Court.prototype, "facility", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => timeslot_entity_1.TimeSlot, (timeSlot) => timeSlot.court),
    __metadata("design:type", Array)
], Court.prototype, "timeSlots", void 0);
exports.Court = Court = __decorate([
    (0, typeorm_1.Entity)('courts'),
    (0, typeorm_1.Index)(['facilityId'])
], Court);
