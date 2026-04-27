"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const entities_1 = require("./database/entities");
const auth_module_1 = require("./modules/auth/auth.module");
const users_module_1 = require("./modules/users/users.module");
const facilities_module_1 = require("./modules/facilities/facilities.module");
const courts_module_1 = require("./modules/courts/courts.module");
const timeslots_module_1 = require("./modules/timeslots/timeslots.module");
const bookings_module_1 = require("./modules/bookings/bookings.module");
const tournaments_module_1 = require("./modules/tournaments/tournaments.module");
const websocket_gateway_1 = require("./modules/websocket/websocket.gateway");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: process.env.DATABASE_HOST || 'localhost',
                port: parseInt(process.env.DATABASE_PORT || '5432'),
                username: process.env.DATABASE_USER || 'canchaya',
                password: process.env.DATABASE_PASSWORD || 'canchaya',
                database: process.env.DATABASE_NAME || 'canchaya_db',
                entities: [
                    entities_1.User,
                    entities_1.Facility,
                    entities_1.Court,
                    entities_1.TimeSlot,
                    entities_1.Booking,
                    entities_1.Tournament,
                    entities_1.TournamentParticipant,
                ],
                synchronize: process.env.NODE_ENV === 'development',
                logging: process.env.NODE_ENV === 'development',
                ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
            }),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            facilities_module_1.FacilitiesModule,
            courts_module_1.CourtsModule,
            timeslots_module_1.TimeSlotsModule,
            bookings_module_1.BookingsModule,
            tournaments_module_1.TournamentsModule,
        ],
        controllers: [],
        providers: [websocket_gateway_1.WebSocketGatewayImpl],
    })
], AppModule);
