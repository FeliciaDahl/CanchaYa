import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})
export class WebSocketGatewayImpl implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server!: Server;

  private connectedClients: Map<string, Socket> = new Map();

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    this.connectedClients.delete(client.id);
  }

  @SubscribeMessage('subscribe-facility')
  handleSubscribeToFacility(client: Socket, facilityId: string) {
    client.join(`facility:${facilityId}`);
    this.connectedClients.set(client.id, client);
  }

  @SubscribeMessage('subscribe-court')
  handleSubscribeToCourt(client: Socket, courtId: string) {
    client.join(`court:${courtId}`);
    this.connectedClients.set(client.id, client);
  }

  @SubscribeMessage('subscribe-user-bookings')
  handleSubscribeToUserBookings(client: Socket, userId: string) {
    client.join(`user:${userId}:bookings`);
    this.connectedClients.set(client.id, client);
  }

  // Emit events for real-time updates
  emitBookingCreated(booking: any) {
    this.server.emit('booking:created', booking);
  }

  emitBookingStatusChanged(booking: any) {
    this.server.to(`user:${booking.userId}:bookings`).emit('booking:status-changed', booking);
  }

  emitAvailabilityChanged(courtId: string, timeSlot: any) {
    this.server.to(`court:${courtId}`).emit('availability:changed', timeSlot);
  }

  emitPriceUpdated(timeSlotId: string, newPrice: number) {
    this.server.emit('price:updated', { timeSlotId, newPrice });
  }

  emitCourtUpdated(courtId: string, court: any) {
    this.server.emit('court:updated', { courtId, court });
  }

  emitFacilityUpdated(facilityId: string, facility: any) {
    this.server.to(`facility:${facilityId}`).emit('facility:updated', facility);
  }
}
