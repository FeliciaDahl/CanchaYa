import { io, Socket } from 'socket.io-client';
import { WEBSOCKET_URL } from '../utils/constants';
import { Booking } from '@canchaya/types';

interface WebSocketEvents {
  'booking:created': (booking: Booking) => void;
  'booking:status-changed': (booking: Booking) => void;
  'availability:changed': (data: {
    courtId: string;
    availability: any[];
  }) => void;
  'facility:updated': (data: {
    facilityId: string;
    facility: any;
  }) => void;
}

export class WebSocketService {
  private socket: Socket | null = null;
  private eventHandlers: Map<string, Function[]> = new Map();

  connect(token: string): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.socket = io(WEBSOCKET_URL, {
          auth: {
            token,
          },
          reconnection: true,
          reconnectionDelay: 1000,
          reconnectionDelayMax: 5000,
          reconnectionAttempts: 5,
        });

        this.socket.on('connect', () => {
          console.log('WebSocket connected');
          resolve();
        });

        this.socket.on('connect_error', (error) => {
          console.error('WebSocket connection error:', error);
          reject(error);
        });

        this.socket.on('disconnect', () => {
          console.log('WebSocket disconnected');
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.eventHandlers.clear();
    }
  }

  subscribe(room: string, callback: (data: any) => void): void {
    if (this.socket) {
      this.socket.emit(`subscribe-${room}`, { room });
      this.socket.on(`${room}:updated`, callback);
    }
  }

  unsubscribe(room: string): void {
    if (this.socket) {
      this.socket.emit(`unsubscribe-${room}`, { room });
      this.socket.off(`${room}:updated`);
    }
  }

  onBookingCreated(callback: (booking: Booking) => void): void {
    if (this.socket) {
      this.socket.on('booking:created', callback);
      this.addEventHandler('booking:created', callback);
    }
  }

  onAvailabilityChanged(callback: (data: { courtId: string; availability: any[] }) => void): void {
    if (this.socket) {
      this.socket.on('availability:changed', callback);
      this.addEventHandler('availability:changed', callback);
    }
  }

  onBookingStatusChanged(callback: (booking: Booking) => void): void {
    if (this.socket) {
      this.socket.on('booking:status-changed', callback);
      this.addEventHandler('booking:status-changed', callback);
    }
  }

  onFacilityUpdated(callback: (data: { facilityId: string; facility: any }) => void): void {
    if (this.socket) {
      this.socket.on('facility:updated', callback);
      this.addEventHandler('facility:updated', callback);
    }
  }

  private addEventHandler(event: string, handler: Function): void {
    if (!this.eventHandlers.has(event)) {
      this.eventHandlers.set(event, []);
    }
    this.eventHandlers.get(event)?.push(handler);
  }

  isConnected(): boolean {
    return this.socket?.connected ?? false;
  }

  getSocket(): Socket | null {
    return this.socket;
  }
}

export const webSocketService = new WebSocketService();
