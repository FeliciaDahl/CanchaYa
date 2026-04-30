import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimeSlot, Court, Facility } from '../../database/entities';
import { TimeSlotsService } from './services/timeslots.service';
import { TimeSlotsController } from './controllers/timeslots.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TimeSlot, Court, Facility])],
  providers: [TimeSlotsService],
  controllers: [TimeSlotsController],
  exports: [TimeSlotsService],
})
export class TimeSlotsModule {}
