// Common types for CanchaYa platform

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  avatar?: string;
  role: 'player' | 'facility_owner' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}

export interface Facility {
  id: string;
  name: string;
  description?: string;
  ownerId: string;
  latitude: number;
  longitude: number;
  address: string;
  city: string;
  phone?: string;
  website?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Court {
  id: string;
  facilityId: string;
  name: string;
  surface: 'clay' | 'artificial' | 'hard';
  hasLights: boolean;
  capacity: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface TimeSlot {
  id: string;
  courtId: string;
  startTime: Date;
  endTime: Date;
  price: number;
  available: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Booking {
  id: string;
  userId: string;
  timeSlotId: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Tournament {
  id: string;
  facilityId: string;
  name: string;
  description?: string;
  maxParticipants: number;
  startDate: Date;
  endDate: Date;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}
