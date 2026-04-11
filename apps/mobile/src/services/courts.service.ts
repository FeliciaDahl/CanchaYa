import { apiClient } from './api';

export const courtsService = {
  getNearby: async (latitude: number, longitude: number, radiusKm: number = 15, limit: number = 50) => {
    return apiClient.get('/facilities/search/nearby', {
      params: {
        latitude,
        longitude,
        radiusKm,
        limit,
      },
    });
  },

  getDetails: async (facilityId: string) => {
    return apiClient.get(`/facilities/${facilityId}`);
  },

  getAvailability: async (courtId: string, startDate: string, endDate: string) => {
    return apiClient.get(`/timeslots/court/${courtId}/availability`, {
      params: {
        startDate,
        endDate,
      },
    });
  },

  searchFacilities: async (query: string) => {
    return apiClient.get('/facilities', {
      params: { search: query },
    });
  },
};
