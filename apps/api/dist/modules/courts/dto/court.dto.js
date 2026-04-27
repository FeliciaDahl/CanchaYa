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
exports.CourtResponseDto = exports.UpdateCourtDto = exports.CreateCourtDto = void 0;
const class_validator_1 = require("class-validator");
class CreateCourtDto {
}
exports.CreateCourtDto = CreateCourtDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCourtDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(['clay', 'artificial', 'hard']),
    __metadata("design:type", String)
], CreateCourtDto.prototype, "surface", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateCourtDto.prototype, "hasLights", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateCourtDto.prototype, "capacity", void 0);
class UpdateCourtDto {
}
exports.UpdateCourtDto = UpdateCourtDto;
class CourtResponseDto {
}
exports.CourtResponseDto = CourtResponseDto;
