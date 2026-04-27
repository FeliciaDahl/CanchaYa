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
exports.TournamentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const tournament_entity_1 = require("../../../database/entities/tournament.entity");
const tournament_participant_entity_1 = require("../../../database/entities/tournament-participant.entity");
const facility_entity_1 = require("../../../database/entities/facility.entity");
let TournamentsService = class TournamentsService {
    constructor(tournamentRepository, participantRepository, facilityRepository) {
        this.tournamentRepository = tournamentRepository;
        this.participantRepository = participantRepository;
        this.facilityRepository = facilityRepository;
    }
    async createTournament(facilityId, ownerId, createTournamentDto) {
        const facility = await this.facilityRepository.findOne({
            where: { id: facilityId },
        });
        if (!facility || facility.ownerId !== ownerId) {
            throw new common_1.ForbiddenException('You do not own this facility');
        }
        if (createTournamentDto.startDate >= createTournamentDto.endDate) {
            throw new common_1.BadRequestException('End date must be after start date');
        }
        const tournament = this.tournamentRepository.create({
            ...createTournamentDto,
            facilityId,
        });
        const saved = await this.tournamentRepository.save(tournament);
        return this.toTournamentResponse(saved);
    }
    async getTournament(tournamentId) {
        const tournament = await this.tournamentRepository.findOne({
            where: { id: tournamentId },
        });
        if (!tournament) {
            throw new common_1.NotFoundException('Tournament not found');
        }
        return this.toTournamentResponse(tournament);
    }
    async updateTournament(tournamentId, facilityId, ownerId, updateTournamentDto) {
        const facility = await this.facilityRepository.findOne({
            where: { id: facilityId },
        });
        if (!facility || facility.ownerId !== ownerId) {
            throw new common_1.ForbiddenException('You do not own this facility');
        }
        const tournament = await this.tournamentRepository.findOne({
            where: { id: tournamentId, facilityId },
        });
        if (!tournament) {
            throw new common_1.NotFoundException('Tournament not found');
        }
        Object.assign(tournament, updateTournamentDto);
        const updated = await this.tournamentRepository.save(tournament);
        return this.toTournamentResponse(updated);
    }
    async joinTournament(tournamentId, userId) {
        const tournament = await this.tournamentRepository.findOne({
            where: { id: tournamentId },
        });
        if (!tournament) {
            throw new common_1.NotFoundException('Tournament not found');
        }
        if (tournament.currentParticipants >= tournament.maxParticipants) {
            throw new common_1.BadRequestException('Tournament is full');
        }
        const existingParticipant = await this.participantRepository.findOne({
            where: { tournamentId, userId },
        });
        if (existingParticipant) {
            throw new common_1.BadRequestException('You are already registered for this tournament');
        }
        const participant = this.participantRepository.create({
            tournamentId,
            userId,
        });
        tournament.currentParticipants += 1;
        await this.tournamentRepository.save(tournament);
        await this.participantRepository.save(participant);
        return this.toTournamentResponse(tournament);
    }
    toTournamentResponse(tournament) {
        return {
            id: tournament.id,
            facilityId: tournament.facilityId,
            name: tournament.name,
            description: tournament.description,
            maxParticipants: tournament.maxParticipants,
            currentParticipants: tournament.currentParticipants,
            startDate: tournament.startDate,
            endDate: tournament.endDate,
            status: tournament.status,
            createdAt: tournament.createdAt,
        };
    }
};
exports.TournamentsService = TournamentsService;
exports.TournamentsService = TournamentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(tournament_entity_1.Tournament)),
    __param(1, (0, typeorm_1.InjectRepository)(tournament_participant_entity_1.TournamentParticipant)),
    __param(2, (0, typeorm_1.InjectRepository)(facility_entity_1.Facility)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], TournamentsService);
