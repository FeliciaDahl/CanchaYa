"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebSocketGatewayImpl = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
let WebSocketGatewayImpl = class WebSocketGatewayImpl {
    constructor() {
        this.connectedClients = new Map();
    }
    handleConnection(client) {
        console.log(`Client connected: ${client.id}`);
    }
    handleDisconnect(client) {
        console.log(`Client disconnected: ${client.id}`);
        this.connectedClients.delete(client.id);
    }
    handleSubscribeToFacility(client, facilityId) {
        client.join(`facility:${facilityId}`);
        this.connectedClients.set(client.id, client);
    }
    handleSubscribeToCourt(client, courtId) {
        client.join(`court:${courtId}`);
        this.connectedClients.set(client.id, client);
    }
    handleSubscribeToUserBookings(client, userId) {
        client.join(`user:${userId}:bookings`);
        this.connectedClients.set(client.id, client);
    }
    // Emit events for real-time updates
    emitBookingCreated(booking) {
        this.server.emit('booking:created', booking);
    }
    emitBookingStatusChanged(booking) {
        this.server.to(`user:${booking.userId}:bookings`).emit('booking:status-changed', booking);
    }
    emitAvailabilityChanged(courtId, timeSlot) {
        this.server.to(`court:${courtId}`).emit('availability:changed', timeSlot);
    }
    emitPriceUpdated(timeSlotId, newPrice) {
        this.server.emit('price:updated', { timeSlotId, newPrice });
    }
    emitCourtUpdated(courtId, court) {
        this.server.emit('court:updated', { courtId, court });
    }
    emitFacilityUpdated(facilityId, facility) {
        this.server.to(`facility:${facilityId}`).emit('facility:updated', facility);
    }
};
exports.WebSocketGatewayImpl = WebSocketGatewayImpl;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], WebSocketGatewayImpl.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('subscribe-facility'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", void 0)
], WebSocketGatewayImpl.prototype, "handleSubscribeToFacility", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('subscribe-court'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", void 0)
], WebSocketGatewayImpl.prototype, "handleSubscribeToCourt", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('subscribe-user-bookings'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", void 0)
], WebSocketGatewayImpl.prototype, "handleSubscribeToUserBookings", null);
exports.WebSocketGatewayImpl = WebSocketGatewayImpl = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
        },
    })
], WebSocketGatewayImpl);
