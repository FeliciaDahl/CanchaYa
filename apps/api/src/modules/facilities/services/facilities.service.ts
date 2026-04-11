import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Facility } from '../../../database/entities/facility.entity';
import { CreateFacilityDto, UpdateFacilityDto, SearchNearbyDto } from '../dto/facility.dto';

@Injectable()
export class FacilitiesService {
  constructor(
    @InjectRepository(Facility)
    private readonly facilityRepository: Repository<Facility>,
  ) {}

  async createFacility(ownerId: string, createFacilityDto: CreateFacilityDto) {
    const { latitude, longitude, ...rest } = createFacilityDto;

    const facility = this.facilityRepository.create({
      ...rest,
      ownerId,
      location: {
        type: 'Point',
        coordinates: [longitude, latitude],
      },
    });

    const saved = await this.facilityRepository.save(facility);
    return this.toFacilityResponse(saved);
  }

  async getFacility(facilityId: string) {
    const facility = await this.facilityRepository.findOne({
      where: { id: facilityId },
      relations: ['owner'],
    });

    if (!facility) {
      throw new NotFoundException('Facility not found');
    }

    return this.toFacilityResponse(facility);
  }

  async updateFacility(
    facilityId: string,
    ownerId: string,
    updateFacilityDto: UpdateFacilityDto,
  ) {
    const facility = await this.facilityRepository.findOne({
      where: { id: facilityId },
    });

    if (!facility) {
      throw new NotFoundException('Facility not found');
    }

    if (facility.ownerId !== ownerId) {
      throw new ForbiddenException('You do not own this facility');
    }

    const { latitude, longitude, ...rest } = updateFacilityDto;

    Object.assign(facility, rest);

    if (latitude !== undefined && longitude !== undefined) {
      facility.location = {
        type: 'Point',
        coordinates: [longitude, latitude],
      };
    }

    const updated = await this.facilityRepository.save(facility);
    return this.toFacilityResponse(updated);
  }

  async deleteFacility(facilityId: string, ownerId: string) {
    const facility = await this.facilityRepository.findOne({
      where: { id: facilityId },
    });

    if (!facility) {
      throw new NotFoundException('Facility not found');
    }

    if (facility.ownerId !== ownerId) {
      throw new ForbiddenException('You do not own this facility');
    }

    await this.facilityRepository.remove(facility);
  }

  async getOwnerFacilities(ownerId: string) {
    const facilities = await this.facilityRepository.find({
      where: { ownerId },
    });

    return facilities.map((f) => this.toFacilityResponse(f));
  }

  async searchNearby(searchDto: SearchNearbyDto) {
    const { latitude, longitude, radiusKm = 5, limit = 20 } = searchDto;

    // Use PostGIS to find nearby facilities
    const query = this.facilityRepository
      .createQueryBuilder('facility')
      .select([
        'facility.id',
        'facility.ownerId',
        'facility.name',
        'facility.description',
        'facility.address',
        'facility.city',
        'facility.phone',
        'facility.website',
        'facility.imageUrls',
        'facility.createdAt',
      ])
      .addSelect(
        `ST_Distance(facility.location::geography, ST_GeogFromText('POINT(${longitude} ${latitude})')::geography)`,
        'distance_m',
      )
      .where(
        `ST_DWithin(facility.location::geography, ST_GeogFromText('POINT(${longitude} ${latitude})')::geography, ${radiusKm * 1000})`,
      )
      .orderBy('distance_m', 'ASC')
      .limit(limit);

    const results = await query.getRawMany();

    return results.map((r) => ({
      ...r,
      location: {
        latitude,
        longitude,
      },
      distanceKm: (r.distance_m / 1000).toFixed(2),
    }));
  }

  private toFacilityResponse(facility: Facility) {
    const coords = facility.location?.coordinates || [0, 0];
    return {
      id: facility.id,
      ownerId: facility.ownerId,
      name: facility.name,
      description: facility.description,
      address: facility.address,
      city: facility.city,
      latitude: coords[1],
      longitude: coords[0],
      phone: facility.phone,
      website: facility.website,
      imageUrls: facility.imageUrls || [],
      createdAt: facility.createdAt,
    };
  }
}
