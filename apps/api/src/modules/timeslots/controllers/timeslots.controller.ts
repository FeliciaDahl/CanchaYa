import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
} from '@nestjs/common';
import { TimeSlotsService } from '../services/timeslots.service';
import { CreateTimeSlotDto, UpdateTimeSlotDto } from '../dto/timeslot.dto';

@Controller('timeslots')
export class TimeSlotsController {
  constructor(private readonly timeSlotsService: TimeSlotsService) {}

  @Post()
  @HttpCode(201)
  async createTimeSlot(
    @Query('courtId') courtId: string,
    @Query('facilityId') facilityId: string,
    @Query('userId') userId: string,
    @Body() createTimeSlotDto: CreateTimeSlotDto,
  ) {
    return this.timeSlotsService.createTimeSlot(
      courtId,
      facilityId,
      userId,
      createTimeSlotDto,
    );
  }

  @Get(':id')
  async getTimeSlot(@Param('id') timeSlotId: string) {
    return this.timeSlotsService.getTimeSlot(timeSlotId);
  }

  @Put(':id')
  async updateTimeSlot(
    @Param('id') timeSlotId: string,
    @Query('courtId') courtId: string,
    @Query('facilityId') facilityId: string,
    @Query('userId') userId: string,
    @Body() updateTimeSlotDto: UpdateTimeSlotDto,
  ) {
    return this.timeSlotsService.updateTimeSlot(
      timeSlotId,
      courtId,
      facilityId,
      userId,
      updateTimeSlotDto,
    );
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteTimeSlot(
    @Param('id') timeSlotId: string,
    @Query('courtId') courtId: string,
    @Query('facilityId') facilityId: string,
    @Query('userId') userId: string,
  ) {
    await this.timeSlotsService.deleteTimeSlot(
      timeSlotId,
      courtId,
      facilityId,
      userId,
    );
  }

  @Get('court/:courtId/availability')
  async getCourtAvailability(
    @Param('courtId') courtId: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.timeSlotsService.getCourtAvailability(
      courtId,
      new Date(startDate),
      new Date(endDate),
    );
  }
}
