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
import { FacilitiesService } from '../services/facilities.service';
import {
  CreateFacilityDto,
  UpdateFacilityDto,
  SearchNearbyDto,
} from '../dto/facility.dto';

@Controller('facilities')
export class FacilitiesController {
  constructor(private readonly facilitiesService: FacilitiesService) {}

  @Post()
  @HttpCode(201)
  async createFacility(
    @Body() createFacilityDto: CreateFacilityDto,
    @Query('userId') userId: string,
  ) {
    return this.facilitiesService.createFacility(userId, createFacilityDto);
  }

  @Get(':id')
  async getFacility(@Param('id') facilityId: string) {
    return this.facilitiesService.getFacility(facilityId);
  }

  @Put(':id')
  async updateFacility(
    @Param('id') facilityId: string,
    @Body() updateFacilityDto: UpdateFacilityDto,
    @Query('userId') userId: string,
  ) {
    return this.facilitiesService.updateFacility(
      facilityId,
      userId,
      updateFacilityDto,
    );
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteFacility(
    @Param('id') facilityId: string,
    @Query('userId') userId: string,
  ) {
    await this.facilitiesService.deleteFacility(facilityId, userId);
  }

  @Get('owner/:ownerId')
  async getOwnerFacilities(@Param('ownerId') ownerId: string) {
    return this.facilitiesService.getOwnerFacilities(ownerId);
  }

  @Post('search/nearby')
  async searchNearby(@Body() searchDto: SearchNearbyDto) {
    return this.facilitiesService.searchNearby(searchDto);
  }
}
