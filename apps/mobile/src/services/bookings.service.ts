import { apiClient } from './api';
import { Booking } from '@canchaya/types';

interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
}

export const bookingsService = {
  create: async (timeSlotId: string): Promise<Booking> => {
    return apiClient.post('/bookings', { timeSlotId });
  },

  getDetails: async (bookingId: string): Promise<Booking> => {
    return apiClient.get(`/bookings/${bookingId}`);
  },

  getUpcoming: async (userId: string): Promise<Booking[]> => {
    return apiClient.get(`/bookings/user/${userId}/upcoming`);
  },

  getAll: async (userId: string, page: number = 1, limit: number = 50): Promise<PaginatedResponse<Booking>> => {
    return apiClient.get(`/bookings/user/${userId}/all`, {
      params: { page, limit },
    });
  },

  updateStatus: async (bookingId: string, status: string): Promise<Booking> => {
    return apiClient.put(`/bookings/${bookingId}/status`, { status });
  },

  cancel: async (bookingId: string): Promise<Booking> => {
    return apiClient.delete(`/bookings/${bookingId}`);
  },
};
