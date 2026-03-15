// WebSocket event types for real-time communication

import type { Booking, TimeSlot } from './index';

export interface BookingNotification {
  type: 'booking_created' | 'booking_cancelled' | 'booking_confirmed' | 'booking_completed';
  booking: Booking;
  timestamp: Date;
  facilityId: string;
}

export interface AvailabilityUpdate {
  type: 'availability_changed';
  timeSlot: TimeSlot;
  timestamp: Date;
  courtId: string;
}

export interface PriceUpdate {
  type: 'price_changed';
  timeSlotId: string;
  oldPrice: number;
  newPrice: number;
  timestamp: Date;
}

export interface TournamentUpdate {
  type: 'tournament_created' | 'tournament_cancelled' | 'participant_joined' | 'participant_left';
  tournamentId: string;
  facilityId: string;
  timestamp: Date;
  data: Record<string, unknown>;
}

export type WebSocketEvent = 
  | BookingNotification 
  | AvailabilityUpdate 
  | PriceUpdate 
  | TournamentUpdate;

export interface WebSocketMessage {
  event: string;
  data: WebSocketEvent;
}
