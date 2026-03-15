// Search and filter types

export interface SearchFacilitiesDto {
  latitude: number;
  longitude: number;
  radiusKm?: number;
  page?: number;
  limit?: number;
}

export interface SearchFacilitiesResponse {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  address: string;
  city: string;
  distance: number;
  courtCount: number;
}

export interface AvailabilityFilter {
  date: Date;
  startTime?: string;
  endTime?: string;
  minPrice?: number;
  maxPrice?: number;
}

export interface BookingsFilter {
  status?: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  fromDate?: Date;
  toDate?: Date;
  facilityId?: string;
}

export interface TournamentsFilter {
  status?: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  facilityId?: string;
  fromDate?: Date;
  toDate?: Date;
}
