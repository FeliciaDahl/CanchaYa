# CanchaYa NestJS API Project Structure

## Installation & Setup

### 1. Install dependencies
```bash
yarn install
```

### 2. Environment setup
```bash
cp .env.example .env
```

### 3. Start PostgreSQL
```bash
docker-compose up -d
```

### 4. Run migrations
```bash
yarn workspace @canchaya/api typeorm:migrate
```

### 5. Start development server
```bash
yarn workspace @canchaya/api dev
```

## Project Structure

```
apps/api/src/
├── main.ts                          # Application entry point
├── app.module.ts                    # Root module
├── common/
│   ├── decorators/                  # Custom decorators (@Auth, @CurrentUser, etc)
│   ├── filters/                     # Exception filters
│   ├── guards/                      # Auth guards, JWT guard
│   ├── interceptors/                # Request/response interceptors
│   └── pipes/                       # Validation pipes
├── config/
│   ├── database.config.ts           # Database configuration
│   ├── jwt.config.ts                # JWT configuration
│   └── typeorm.config.ts            # TypeORM CLI configuration
├── modules/
│   ├── auth/
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── auth.module.ts
│   │   ├── strategies/              # JWT, local strategies
│   │   └── dtos/
│   ├── users/
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   ├── users.module.ts
│   │   ├── entities/
│   │   └── dtos/
│   ├── facilities/
│   ├── courts/
│   ├── time-slots/
│   ├── bookings/
│   └── tournaments/
├── database/
│   ├── entities/                    # All database entities
│   └── migrations/                  # Database migrations
├── websocket/
│   ├── events.gateway.ts
│   ├── events.module.ts
│   └── events.service.ts
└── utils/
    ├── geolocation.util.ts          # PostGIS utilities
    ├── validators.ts                # Custom validators
    └── helpers.ts                   # Helper functions
```

## Module Descriptions

### Auth Module
- Login / Register endpoints
- JWT token generation & refresh
- Password hashing with bcrypt
- Guards and decorators for route protection

### Users Module
- User profile management
- User preferences
- Profile updates

### Facilities Module
- CRUD operations for facilities
- Ownership validation
- Location-based search (PostGIS)

### Courts Module
- Court management within facilities
- Court attributes (surface, lights, capacity)

### TimeSlots Module
- Availability scheduling
- Pricing management
- Holiday management

### Bookings Module
- Create/update/cancel bookings
- Booking status tracking
- Payment integration placeholder

### Tournaments Module
- Tournament creation and management
- Participant management
- Tournament scheduling

## Commands

```bash
# Development
yarn workspace @canchaya/api dev

# Build
yarn workspace @canchaya/api build

# Run production build
yarn workspace @canchaya/api start

# Lint
yarn workspace @canchaya/api lint

# Test
yarn workspace @canchaya/api test

# Migrations
yarn workspace @canchaya/api typeorm:generate
yarn workspace @canchaya/api typeorm:migrate
yarn workspace @canchaya/api typeorm:revert
```

## Database Setup

The PostgreSQL database is configured with:
- PostGIS extension for geolocation queries
- TypeORM for ORM management
- Auto-generated migrations in development

## Authentication

JWT-based authentication with:
- Access tokens (short-lived)
- Refresh tokens (long-lived)
- Role-based access control (RBAC)

## WebSocket

Real-time events for:
- Booking notifications
- Availability updates
- Price changes
- Tournament updates
