import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Query,
  HttpCode,
  Delete,
} from '@nestjs/common';
import { BookingsService } from '../services/bookings.service';
import { CreateBookingDto, UpdateBookingStatusDto } from '../dto/booking.dto';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  @HttpCode(201)
  async createBooking(
    @Query('userId') userId: string,
    @Body() createBookingDto: CreateBookingDto,
  ) {
    return this.bookingsService.createBooking(userId, createBookingDto);
  }

  @Get(':id')
  async getBooking(
    @Param('id') bookingId: string,
    @Query('userId') userId?: string,
  ) {
    return this.bookingsService.getBooking(bookingId, userId);
  }

  @Put(':id/status')
  async updateBookingStatus(
    @Param('id') bookingId: string,
    @Body() updateDto: UpdateBookingStatusDto,
    @Query('userId') userId?: string,
  ) {
    return this.bookingsService.updateBookingStatus(bookingId, updateDto, userId);
  }

  @Delete(':id')
  @HttpCode(204)
  async cancelBooking(
    @Param('id') bookingId: string,
    @Query('userId') userId: string,
  ) {
    await this.bookingsService.cancelBooking(bookingId, userId);
  }

  @Get('user/:userId/all')
  async getUserBookings(@Param('userId') userId: string) {
    return this.bookingsService.getUserBookings(userId);
  }

  @Get('user/:userId/upcoming')
  async getUpcomingBookings(@Param('userId') userId: string) {
    return this.bookingsService.getUpcomingBookings(userId);
  }
}
