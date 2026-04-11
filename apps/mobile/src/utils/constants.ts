// API Configuration
export const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || 'http://localhost:3000/api';
export const API_TIMEOUT = parseInt(process.env.EXPO_PUBLIC_API_TIMEOUT || '10000');
export const WEBSOCKET_URL = process.env.EXPO_PUBLIC_WEBSOCKET_URL || 'ws://localhost:3000';

// Storage Keys
export const STORAGE_KEYS = {
  ACCESS_TOKEN: '@canchaya:accessToken',
  REFRESH_TOKEN: '@canchaya:refreshToken',
  USER_DATA: '@canchaya:userData',
  USER_LOCATION: '@canchaya:userLocation',
  FAVORITES: '@canchaya:favorites',
  NOTIFICATION_PREFS: '@canchaya:notificationPrefs',
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  AUTH_FAILED: 'Authentication failed. Please try again.',
  BOOKING_FAILED: 'Booking failed. Please try again.',
  LOCATION_PERMISSION: 'Location permission denied. Enable in settings.',
  NOTIFICATION_PERMISSION: 'Notification permission denied.',
  INVALID_EMAIL: 'Invalid email address.',
  PASSWORD_WEAK: 'Password must be at least 8 characters.',
  EMAIL_EXISTS: 'Email already registered.',
  BOOKING_CONFLICT: 'Time slot no longer available.',
  UNAUTHORIZED: 'Unauthorized. Please login again.',
};

// App Limits & Defaults
export const APP_DEFAULTS = {
  NEARBY_SEARCH_RADIUS_KM: 15,
  BOOKING_ADVANCE_DAYS: 60,
  MAX_BOOKINGS_DISPLAY: 100,
  NOTIFICATION_TIMEOUT_MS: 5000,
  DEBOUNCE_DELAY_MS: 500,
  ANIMATION_DURATION_MS: 300,
};

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_ERROR: 500,
};

// Booking Status
export const BOOKING_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
};

// User Roles
export const USER_ROLES = {
  PLAYER: 'player',
  OWNER: 'facility_owner',
  ADMIN: 'admin',
};
