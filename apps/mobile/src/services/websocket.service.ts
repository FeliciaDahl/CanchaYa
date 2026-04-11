import { io, Socket } from 'socket.io-client';
import { WEBSOCKET_URL } from '../utils/constants';

export class WebSocketService {
  private socket: Socket | null = null;

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
      } catch (error) {
        reject(error);
      }
    });
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
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

  onBookingCreated(callback: (booking: any) => void): void {
    if (this.socket) {
      this.socket.on('booking:created', callback);
    }
  }

  onAvailabilityChanged(callback: (data: any) => void): void {
    if (this.socket) {
      this.socket.on('availability:changed', callback);
    }
  }

  onBookingStatusChanged(callback: (booking: any) => void): void {
    if (this.socket) {
      this.socket.on('booking:status-changed', callback);
    }
  }

  isConnected(): boolean {
    return this.socket?.connected ?? false;
  }
}

export const webSocketService = new WebSocketService();
