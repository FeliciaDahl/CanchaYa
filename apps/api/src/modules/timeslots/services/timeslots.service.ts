import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { TimeSlot } from '../../../database/entities/timeslot.entity';
import { Court } from '../../../database/entities/court.entity';
import { Facility } from '../../../database/entities/facility.entity';
import { CreateTimeSlotDto, UpdateTimeSlotDto } from '../dto/timeslot.dto';

@Injectable()
export class TimeSlotsService {
  constructor(
    @InjectRepository(TimeSlot)
    private readonly timeSlotRepository: Repository<TimeSlot>,
    @InjectRepository(Court)
    private readonly courtRepository: Repository<Court>,
    @InjectRepository(Facility)
    private readonly facilityRepository: Repository<Facility>,
  ) {}

  async createTimeSlot(
    courtId: string,
    facilityId: string,
    ownerId: string,
    createTimeSlotDto: CreateTimeSlotDto,
  ) {
    // Verify facility ownership
    const facility = await this.facilityRepository.findOne({
      where: { id: facilityId },
    });

    if (!facility || facility.ownerId !== ownerId) {
      throw new ForbiddenException('You do not own this facility');
    }

    // Verify court belongs to facility
    const court = await this.courtRepository.findOne({
      where: { id: courtId, facilityId },
    });

    if (!court) {
      throw new NotFoundException('Court not found in this facility');
    }

    if (createTimeSlotDto.startTime >= createTimeSlotDto.endTime) {
      throw new BadRequestException('End time must be after start time');
    }

    const timeSlot = this.timeSlotRepository.create({
      ...createTimeSlotDto,
      courtId,
    });

    const saved = await this.timeSlotRepository.save(timeSlot);
    return this.toTimeSlotResponse(saved);
  }

  async getTimeSlot(timeSlotId: string) {
    const timeSlot = await this.timeSlotRepository.findOne({
      where: { id: timeSlotId },
    });

    if (!timeSlot) {
      throw new NotFoundException('Time slot not found');
    }

    return this.toTimeSlotResponse(timeSlot);
  }

  async updateTimeSlot(
    timeSlotId: string,
    courtId: string,
    facilityId: string,
    ownerId: string,
    updateTimeSlotDto: UpdateTimeSlotDto,
  ) {
    // Verify ownership
    const facility = await this.facilityRepository.findOne({
      where: { id: facilityId },
    });

    if (!facility || facility.ownerId !== ownerId) {
      throw new ForbiddenException('You do not own this facility');
    }

    const timeSlot = await this.timeSlotRepository.findOne({
      where: { id: timeSlotId, courtId },
    });

    if (!timeSlot) {
      throw new NotFoundException('Time slot not found');
    }

    if (updateTimeSlotDto.startTime && updateTimeSlotDto.endTime) {
      if (updateTimeSlotDto.startTime >= updateTimeSlotDto.endTime) {
        throw new BadRequestException('End time must be after start time');
      }
    }

    Object.assign(timeSlot, updateTimeSlotDto);
    const updated = await this.timeSlotRepository.save(timeSlot);
    return this.toTimeSlotResponse(updated);
  }

  async deleteTimeSlot(
    timeSlotId: string,
    courtId: string,
    facilityId: string,
    ownerId: string,
  ) {
    const facility = await this.facilityRepository.findOne({
      where: { id: facilityId },
    });

    if (!facility || facility.ownerId !== ownerId) {
      throw new ForbiddenException('You do not own this facility');
    }

    const timeSlot = await this.timeSlotRepository.findOne({
      where: { id: timeSlotId, courtId },
    });

    if (!timeSlot) {
      throw new NotFoundException('Time slot not found');
    }

    await this.timeSlotRepository.remove(timeSlot);
  }

  async getCourtAvailability(courtId: string, startDate: Date, endDate: Date) {
    const timeSlots = await this.timeSlotRepository.find({
      where: {
        courtId,
        startTime: Between(startDate, endDate),
      },
      order: { startTime: 'ASC' },
    });

    return timeSlots.map((ts) => this.toTimeSlotResponse(ts));
  }

  private toTimeSlotResponse(timeSlot: TimeSlot) {
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
}
