// DTOs for API requests/responses

export interface CreateUserDto {
  email: string;
  name: string;
  password: string;
  phone?: string;
  role: 'player' | 'facility_owner';
}

export interface UpdateUserDto {
  name?: string;
  phone?: string;
  avatar?: string;
}

export interface CreateFacilityDto {
  name: string;
  description?: string;
  latitude: number;
  longitude: number;
  address: string;
  city: string;
  phone?: string;
  website?: string;
}

export interface UpdateFacilityDto {
  name?: string;
  description?: string;
  latitude?: number;
  longitude?: number;
  address?: string;
  city?: string;
  phone?: string;
  website?: string;
}

export interface CreateCourtDto {
  name: string;
  surface: 'clay' | 'artificial' | 'hard';
  hasLights: boolean;
  capacity: number;
}

export interface UpdateCourtDto {
  name?: string;
  surface?: 'clay' | 'artificial' | 'hard';
  hasLights?: boolean;
  capacity?: number;
}

export interface CreateTimeSlotDto {
  courtId: string;
  startTime: Date;
  endTime: Date;
  price: number;
}

export interface UpdateTimeSlotDto {
  price?: number;
  available?: boolean;
}

export interface CreateBookingDto {
  timeSlotId: string;
}

export interface UpdateBookingDto {
  status?: 'pending' | 'confirmed' | 'cancelled' | 'completed';
}

export interface CreateTournamentDto {
  name: string;
  description?: string;
  maxParticipants: number;
  startDate: Date;
  endDate: Date;
}

export interface UpdateTournamentDto {
  name?: string;
  description?: string;
  status?: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
}
