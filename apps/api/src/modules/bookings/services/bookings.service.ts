import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from '../../../database/entities/booking.entity';
import { TimeSlot } from '../../../database/entities/timeslot.entity';
import { CreateBookingDto, UpdateBookingStatusDto } from '../dto/booking.dto';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
    @InjectRepository(TimeSlot)
    private readonly timeSlotRepository: Repository<TimeSlot>,
  ) {}

  async createBooking(userId: string, createBookingDto: CreateBookingDto) {
    const { timeSlotId, notes } = createBookingDto;

    // Get time slot with pricing
    const timeSlot = await this.timeSlotRepository.findOne({
      where: { id: timeSlotId },
    });

    if (!timeSlot) {
      throw new NotFoundException('Time slot not found');
    }

    if (!timeSlot.available) {
      throw new BadRequestException('Time slot is not available');
    }

    // Check if user already has booking for this slot
    const existingBooking = await this.bookingRepository.findOne({
      where: { userId, timeSlotId },
    });

    if (existingBooking) {
      throw new BadRequestException('You already have a booking for this time slot');
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

  async getBooking(bookingId: string, userId?: string) {
    const booking = await this.bookingRepository.findOne({
      where: { id: bookingId },
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    if (userId && booking.userId !== userId) {
      throw new ForbiddenException('You do not have access to this booking');
    }

    return this.toBookingResponse(booking);
  }

  async updateBookingStatus(
    bookingId: string,
    updateDto: UpdateBookingStatusDto,
    userId?: string,
  ) {
    const booking = await this.bookingRepository.findOne({
      where: { id: bookingId },
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    // If userId provided, only allow booking owner to update
    if (userId && booking.userId !== userId) {
      throw new ForbiddenException('You cannot update this booking');
    }

    booking.status = updateDto.status;
    if (updateDto.notes) {
      booking.notes = updateDto.notes;
    }

    const updated = await this.bookingRepository.save(booking);
    return this.toBookingResponse(updated);
  }

  async cancelBooking(bookingId: string, userId: string) {
    const booking = await this.bookingRepository.findOne({
      where: { id: bookingId },
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    if (booking.userId !== userId) {
      throw new ForbiddenException('You can only cancel your own bookings');
    }

    if (booking.status === 'cancelled') {
      throw new BadRequestException('Booking is already cancelled');
    }

    booking.status = 'cancelled';
    const updated = await this.bookingRepository.save(booking);
    return this.toBookingResponse(updated);
  }

  async getUserBookings(userId: string) {
    const bookings = await this.bookingRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });

    return bookings.map((b) => this.toBookingResponse(b));
  }

  async getUpcomingBookings(userId: string) {
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

  private toBookingResponse(booking: Booking) {
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
}
