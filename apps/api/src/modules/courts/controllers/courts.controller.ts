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
import { CourtsService } from '../services/courts.service';
import { CreateCourtDto, UpdateCourtDto } from '../dto/court.dto';

@Controller('courts')
export class CourtsController {
  constructor(private readonly courtsService: CourtsService) {}

  @Post()
  @HttpCode(201)
  async createCourt(
    @Query('facilityId') facilityId: string,
    @Query('userId') userId: string,
    @Body() createCourtDto: CreateCourtDto,
  ) {
    return this.courtsService.createCourt(facilityId, userId, createCourtDto);
  }

  @Get(':id')
  async getCourt(@Param('id') courtId: string) {
    return this.courtsService.getCourt(courtId);
  }

  @Put(':id')
  async updateCourt(
    @Param('id') courtId: string,
    @Query('facilityId') facilityId: string,
    @Query('userId') userId: string,
    @Body() updateCourtDto: UpdateCourtDto,
  ) {
    return this.courtsService.updateCourt(
      courtId,
      facilityId,
      userId,
      updateCourtDto,
    );
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteCourt(
    @Param('id') courtId: string,
    @Query('facilityId') facilityId: string,
    @Query('userId') userId: string,
  ) {
    await this.courtsService.deleteCourt(courtId, facilityId, userId);
  }

  @Get('facility/:facilityId')
  async getFacilityCourts(@Param('facilityId') facilityId: string) {
    return this.courtsService.getFacilityCourts(facilityId);
  }
}
