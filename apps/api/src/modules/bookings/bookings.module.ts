import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking, TimeSlot } from '../../database/entities';
import { BookingsService } from './services/bookings.service';
import { BookingsController } from './controllers/bookings.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Booking, TimeSlot])],
  providers: [BookingsService],
  controllers: [BookingsController],
  exports: [BookingsService],
})
export class BookingsModule {}
