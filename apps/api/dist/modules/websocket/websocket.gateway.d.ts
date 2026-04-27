import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
export declare class WebSocketGatewayImpl implements OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    private connectedClients;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    handleSubscribeToFacility(client: Socket, facilityId: string): void;
    handleSubscribeToCourt(client: Socket, courtId: string): void;
    handleSubscribeToUserBookings(client: Socket, userId: string): void;
    emitBookingCreated(booking: any): void;
    emitBookingStatusChanged(booking: any): void;
    emitAvailabilityChanged(courtId: string, timeSlot: any): void;
    emitPriceUpdated(timeSlotId: string, newPrice: number): void;
    emitCourtUpdated(courtId: string, court: any): void;
    emitFacilityUpdated(facilityId: string, facility: any): void;
}
