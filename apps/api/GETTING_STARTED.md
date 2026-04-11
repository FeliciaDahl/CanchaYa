# CanchaYa NestJS API - Getting Started Guide

## Quick Start

### 1. Install Dependencies
```bash
yarn install
```

### 2. Start PostgreSQL Database
```bash
docker-compose up -d postgres
```

Verify the database is running:
```bash
docker-compose ps
```

### 3. Set Up Environment
```bash
# API already has .env configured, but you can customize it:
cat apps/api/.env
```

### 4. Build & Run API

```bash
# Development mode with hot reload
yarn workspace @canchaya/api dev

# Build for production
yarn workspace @canchaya/api build

# Run production build
yarn workspace @canchaya/api start
```

The API will be available at `http://localhost:3000`

## Architecture Overview

### Technology Stack
- **Framework**: NestJS 10
- **Language**: TypeScript
- **Database**: PostgreSQL with PostGIS
- **ORM**: TypeORM
- **Authentication**: JWT with Passport
- **Real-time**: WebSocket (Socket.IO compatible)

### Directory Structure

```
apps/api/src/
├── main.ts                      # Entry point
├── app.module.ts               # Root module
├── common/                      # Shared utilities
│   ├── decorators/             # @Auth, @CurrentUser, @Roles
│   ├── filters/                # Exception handling
│   ├── guards/                 # JWT guard, role guards
│   └── interceptors/           # Logging, transformation
├── config/                     # Configuration files
├── modules/                    # Feature modules
│   ├── auth/                   # Authentication (login, register, refresh)
│   ├── users/                  # User management & profiles
│   ├── facilities/             # Facility CRUD & location search
│   ├── courts/                 # Court management
│   ├── time-slots/             # Availability & pricing
│   ├── bookings/               # Booking management
│   └── tournaments/            # Tournament management
├── database/                   # Database layer
│   ├── entities/               # TypeORM entities
│   └── migrations/             # Database migrations
└── websocket/                  # Real-time events
```

## Module Details

### Auth Module
**Endpoints:**
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `POST /auth/refresh` - Refresh JWT token
- `POST /auth/logout` - Logout user

**Features:**
- Password hashing with bcrypt
- JWT token management
- Role-based access control

### Users Module
**Endpoints:**
- `GET /users/me` - Get current user profile
- `PATCH /users/me` - Update user profile
- `GET /users/:id` - Get user by ID (admin only)

### Facilities Module
**Endpoints:**
- `POST /facilities` - Create facility (owners only)
- `GET /facilities` - List facilities with pagination
- `GET /facilities/nearby` - Find nearby facilities (PostGIS)
- `GET /facilities/:id` - Get facility details
- `PATCH /facilities/:id` - Update facility
- `DELETE /facilities/:id` - Delete facility

### Courts Module
**Endpoints:**
- `POST /courts` - Create court in facility
- `GET /facilities/:facilityId/courts` - List courts in facility
- `GET /courts/:id` - Get court details
- `PATCH /courts/:id` - Update court
- `DELETE /courts/:id` - Delete court

### TimeSlots Module
**Endpoints:**
- `POST /time-slots` - Create availability slot
- `GET /facilities/:facilityId/availability` - Get availability with filtering
- `PATCH /time-slots/:id` - Update slot/price
- `DELETE /time-slots/:id` - Delete slot

### Bookings Module
**Endpoints:**
- `POST /bookings` - Create booking
- `GET /bookings` - Get user's bookings
- `GET /bookings/:id` - Get booking details
- `PATCH /bookings/:id` - Cancel booking
- `GET /facilities/:facilityId/bookings` - Get facility bookings (owners)

### Tournaments Module
**Endpoints:**
- `POST /tournaments` - Create tournament
- `GET /tournaments` - List tournaments
- `GET /tournaments/:id` - Get tournament details
- `POST /tournaments/:id/join` - Join tournament
- `DELETE /tournaments/:id/leave` - Leave tournament
- `PATCH /tournaments/:id` - Update tournament (owners)

## Database Setup

### Entities to Create
- **User** - User accounts & profiles
- **Facility** - Courts/Facilities
- **Court** - Individual courts within facilities
- **TimeSlot** - Available time slots with pricing
- **Booking** - User bookings
- **Tournament** - Tournaments hosted at facilities
- **TournamentParticipant** - Many-to-many relationship

### PostGIS Integration
```sql
-- Enable PostGIS for location queries
CREATE EXTENSION postgis;

-- Find nearby facilities (example)
SELECT * FROM facilities
WHERE ST_DWithin(location::geography, ST_GeogFromText('POINT(lat lng)')::geography, 5000);
```

## Authentication Flow

1. User registers with email/password
2. API hashes password with bcrypt
3. On login, API returns JWT tokens:
   - `accessToken`: Short-lived (24h)
   - `refreshToken`: Long-lived (7d)
4. Client sends `accessToken` in Authorization header
5. On token expiration, client uses `refreshToken` to get new tokens

## WebSocket Events

Real-time events for:
- Booking notifications
- Availability updates
- Price changes
- Tournament updates

Connect at: `ws://localhost:3000/events`

## Error Handling

All errors follow this format:
```json
{
  "statusCode": 400,
  "message": "Error description",
  "error": "BadRequest"
}
```

## Next Steps

1. Implement database schema and entities
2. Create auth module with JWT strategy
3. Build user management module
4. Implement facility and court modules
5. Add booking system
6. Set up WebSocket gateway for real-time updates
7. Integrate geolocation search (PostGIS)
