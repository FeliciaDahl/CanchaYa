import { apiClient } from './api';
import { Facility, Court, TimeSlot } from '@canchaya/types';

interface NearbyFacilitiesResponse {
  courts: Facility[];
}

interface AvailabilityResponse {
  availability: TimeSlot[];
}

export const courtsService = {
  getNearby: async (
    latitude: number,
    longitude: number,
    radiusKm: number = 15,
    limit: number = 50,
  ): Promise<NearbyFacilitiesResponse> => {
    return apiClient.get('/facilities/search/nearby', {
      params: {
        latitude,
        longitude,
        radiusKm,
        limit,
      },
    });
  },

  getDetails: async (facilityId: string): Promise<Facility> => {
    return apiClient.get(`/facilities/${facilityId}`);
  },

  getAvailability: async (
    courtId: string,
    startDate: string,
    endDate: string,
  ): Promise<AvailabilityResponse> => {
    return apiClient.get(`/timeslots/court/${courtId}/availability`, {
      params: {
        startDate,
        endDate,
      },
    });
  },

  searchFacilities: async (query: string): Promise<Facility[]> => {
    return apiClient.get('/facilities', {
      params: { search: query },
    });
  },
};
