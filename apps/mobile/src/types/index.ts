// Re-export shared types from @canchaya/types
export * from '@canchaya/types';

// Mobile-specific types
export interface AuthState {
  isAuthenticated: boolean;
  user: any | null;
  loading: boolean;
  error: string | null;
  accessToken: string | null;
  refreshToken: string | null;
}

export interface Court {
  id: string;
  name: string;
  city?: string;
  distance?: number;
  rating?: number;
  reviewCount?: number;
  surface: string;
  pricePerHour: number;
  availableCourts: number;
  hasLights: boolean;
  hasParking?: boolean;
  hasRestroom?: boolean;
  hasRefreshments?: boolean;
  courtSize?: string;
  operatingHours?: string;
}

export interface CourtsState {
  courts: Court[];
  selectedCourt: Court | null;
  loading: boolean;
  error: string | null;
  userLocation: {
    latitude: number;
    longitude: number;
  } | null;
}

export interface BookingsState {
  bookings: any[];
  selectedBooking: any | null;
  loading: boolean;
  error: string | null;
}

export interface AppState {
  auth: AuthState;
  courts: CourtsState;
  bookings: BookingsState;
}
