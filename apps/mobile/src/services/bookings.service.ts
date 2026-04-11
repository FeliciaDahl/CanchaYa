import { apiClient } from './api';

export const bookingsService = {
  create: async (timeSlotId: string) => {
    return apiClient.post('/bookings', { timeSlotId });
  },

  getDetails: async (bookingId: string) => {
    return apiClient.get(`/bookings/${bookingId}`);
  },

  getUpcoming: async (userId: string) => {
    return apiClient.get(`/bookings/user/${userId}/upcoming`);
  },

  getAll: async (userId: string, page: number = 1, limit: number = 50) => {
    return apiClient.get(`/bookings/user/${userId}/all`, {
      params: { page, limit },
    });
  },

  updateStatus: async (bookingId: string, status: string) => {
    return apiClient.put(`/bookings/${bookingId}/status`, { status });
  },

  cancel: async (bookingId: string) => {
    return apiClient.delete(`/bookings/${bookingId}`);
  },
};
