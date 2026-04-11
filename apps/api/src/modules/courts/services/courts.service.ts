import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Court } from '../../../database/entities/court.entity';
import { Facility } from '../../../database/entities/facility.entity';
import { CreateCourtDto, UpdateCourtDto } from '../dto/court.dto';

@Injectable()
export class CourtsService {
  constructor(
    @InjectRepository(Court)
    private readonly courtRepository: Repository<Court>,
    @InjectRepository(Facility)
    private readonly facilityRepository: Repository<Facility>,
  ) {}

  async createCourt(facilityId: string, ownerId: string, createCourtDto: CreateCourtDto) {
    const facility = await this.facilityRepository.findOne({
      where: { id: facilityId },
    });

    if (!facility) {
      throw new NotFoundException('Facility not found');
    }

    if (facility.ownerId !== ownerId) {
      throw new ForbiddenException('You do not own this facility');
    }

    const court = this.courtRepository.create({
      ...createCourtDto,
      facilityId,
    });

    const saved = await this.courtRepository.save(court);
    return this.toCourtResponse(saved);
  }

  async getCourt(courtId: string) {
    const court = await this.courtRepository.findOne({
      where: { id: courtId },
    });

    if (!court) {
      throw new NotFoundException('Court not found');
    }

    return this.toCourtResponse(court);
  }

  async updateCourt(
    courtId: string,
    facilityId: string,
    ownerId: string,
    updateCourtDto: UpdateCourtDto,
  ) {
    const facility = await this.facilityRepository.findOne({
      where: { id: facilityId },
    });

    if (!facility || facility.ownerId !== ownerId) {
      throw new ForbiddenException('You do not own this facility');
    }

    const court = await this.courtRepository.findOne({
      where: { id: courtId, facilityId },
    });

    if (!court) {
      throw new NotFoundException('Court not found');
    }

    Object.assign(court, updateCourtDto);
    const updated = await this.courtRepository.save(court);
    return this.toCourtResponse(updated);
  }

  async deleteCourt(courtId: string, facilityId: string, ownerId: string) {
    const facility = await this.facilityRepository.findOne({
      where: { id: facilityId },
    });

    if (!facility || facility.ownerId !== ownerId) {
      throw new ForbiddenException('You do not own this facility');
    }

    const court = await this.courtRepository.findOne({
      where: { id: courtId, facilityId },
    });

    if (!court) {
      throw new NotFoundException('Court not found');
    }

    await this.courtRepository.remove(court);
  }

  async getFacilityCourts(facilityId: string) {
    const courts = await this.courtRepository.find({
      where: { facilityId },
    });

    return courts.map((c) => this.toCourtResponse(c));
  }

  private toCourtResponse(court: Court) {
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
}
