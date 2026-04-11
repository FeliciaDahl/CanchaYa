# CanchaYa - Copilot AI Instructions

## Project Overview

**CanchaYa** is a two-sided marketplace platform for booking padel courts in Argentina. The MVP includes a mobile app (React Native), web admin dashboard, and NestJS backend API with real-time capabilities.

- **Target**: Padel court discovery and booking in Argentina
- **Current Phase**: Phase 4 ✅ (Backend API Complete, Production Ready)
- **Tech Stack**: React Native, NestJS, PostgreSQL + PostGIS, Docker
- **Repository**: C:\Projects\CanchaYa (Yarn monorepo)

---

## Current Project Status

### ✅ Completed

**Phase 1: Project Setup**
- Git repository initialized
- Monorepo structure (Yarn workspaces)
- NestJS project scaffolding
- Docker containerization

**Phase 2: Design & Planning**
- Product specification
- Data model design
- Architecture planning
- UX/UI principles defined

**Phase 3: Database Schema**
- 7 TypeORM entities with relationships
- PostgreSQL + PostGIS integration
- 15+ performance indexes
- Database migrations & views

**Phase 4: Backend API Modules** ← **YOU ARE HERE**
- 8 feature modules (Auth, Users, Facilities, Courts, TimeSlots, Bookings, Tournaments, WebSocket)
- 37 REST endpoints
- Real-time WebSocket support
- JWT authentication & role-based access control
- PostGIS geolocation search ("nearby courts")
- Complete API documentation
- Production-ready code

### ⏳ Upcoming

**Phase 5**: Mobile App (React Native + Expo)
**Phase 6**: Web Admin Dashboard (React admin panel)
**Phase 7**: Advanced Features (Payments, Ratings, Matchmaking, Rankings)

---

## Repository Structure

```
CanchaYa/
├── apps/
│   ├── api/                          # Backend API (NestJS) - Phase 4 ✅
│   │   ├── src/
│   │   │   ├── database/
│   │   │   │   ├── entities/         # 7 TypeORM entities
│   │   │   │   └── migrations/       # TypeORM migrations
│   │   │   ├── modules/              # 8 feature modules
│   │   │   │   ├── auth/
│   │   │   │   ├── users/
│   │   │   │   ├── facilities/       # PostGIS geolocation
│   │   │   │   ├── courts/
│   │   │   │   ├── timeslots/
│   │   │   │   ├── bookings/
│   │   │   │   ├── tournaments/
│   │   │   │   └── websocket/        # Real-time updates
│   │   │   ├── app.module.ts
│   │   │   └── main.ts
│   │   ├── typeorm.config.ts
│   │   ├── .env
│   │   └── package.json
│   ├── mobile/                       # Phase 5 (not started)
│   └── web/                          # Phase 6 (not started)
├── packages/
│   └── types/                        # Shared TypeScript types
├── docker/
│   ├── schema.sql                    # Database schema
│   └── init.sql                      # PostgreSQL initialization
├── docs/                             # Documentation (detailed reference)
│   ├── README.md                     # Doc index
│   ├── API_QUICK_START.md            # Developer quick start
│   ├── PHASE4_BACKEND_COMPLETE.md    # Backend comprehensive docs
│   ├── DATABASE_SETUP.md             # Database setup guide
│   ├── IMPLEMENTATION_PLAN.md        # Feature specification
│   ├── architecture.md               # System architecture
│   ├── rules.md                      # Development rules
│   ├── product.md                    # Product vision
│   └── ux.md                         # UX principles
├── docker-compose.yml                # Service orchestration
├── package.json                      # Root workspace config
└── tsconfig.json                     # TypeScript config
```

---

## Tech Stack & Key Tools

### Backend
- **Framework**: NestJS (TypeScript)
- **Database**: PostgreSQL 16 with PostGIS (geospatial queries)
- **ORM**: TypeORM with migrations
- **Authentication**: JWT (JSON Web Tokens)
- **Password Security**: bcrypt
- **Real-Time**: Socket.IO WebSocket gateway
- **Container**: Docker

### Frontend (Planned)
- **Mobile**: React Native + Expo
- **Web Dashboard**: React
- **Shared Types**: TypeScript types package

### Development
- **Package Manager**: Yarn (workspaces)
- **Language**: TypeScript
- **Runtime**: Node.js >= 18

---

## Development Rules & Guidelines

### Code Structure
1. **Monorepo**: Use `apps/` for independent apps, `packages/` for shared code
2. **Backend Modules**: Business logic in services, controllers handle HTTP
3. **DTOs**: Always use Data Transfer Objects for API requests/responses
4. **Entities**: TypeORM entities in `database/entities/`, exported via index file
5. **Naming**: Use descriptive kebab-case for branches, clear commit messages

### Git Workflow
- Create feature branches: `feature/<feature-name>`
- Commit small, logical changes
- Push branch when ready for review
- Merge to main after approval
- Always include co-author: `Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>`

### Code Quality
- TypeScript strict mode enabled
-Never generate JavaScript files.
- No hardcoded credentials (use `.env`)
- Input validation with DTOs
- Ownership validation for protected endpoints
- Role-based access control (RBAC)

### NestJS Patterns
- Each module has: `.module.ts`, `.service.ts`, `.controller.ts`, `.dto.ts`
- Services contain business logic
- Controllers handle routes only
- Modules import/export dependencies explicitly

---

## Database Schema

### 7 Core Entities

1. **User** - Player and facility owner accounts
   - Fields: id, email, password, name, role, createdAt, updatedAt
   - Roles: "player", "owner"

2. **Facility** - Padel court facility
   - Fields: id, name, description, address, city, location (PostGIS Point), phone, website, ownerId, createdAt, updatedAt
   - Location: Stored as Geography Point for distance queries

3. **Court** - Individual court within a facility
   - Fields: id, name, surface, hasLights, capacity, facilityId, createdAt, updatedAt
   - Surfaces: "artificial", "natural"

4. **TimeSlot** - Available booking times
   - Fields: id, startTime, endTime, price, available, courtId, createdAt, updatedAt

5. **Booking** - Player reservations
   - Fields: id, status, notes, totalPrice, userId, timeSlotId, createdAt, updatedAt
   - Statuses: "pending", "confirmed", "cancelled", "completed"

6. **Tournament** - Multi-player events
   - Fields: id, name, description, maxParticipants, status, facilityId, createdAt, updatedAt

7. **TournamentParticipant** - User tournament enrollments
   - Fields: id, userId, tournamentId, joinedAt

### Key Features
- **PostGIS**: Location stored as Geography for accurate distance calculations
- **Relationships**: Proper foreign keys with cascade deletes
- **Timestamps**: Automatic createdAt and updatedAt
- **Indexes**: Composite indexes on frequently filtered columns and spatial indexes for PostGIS

---

## API Endpoints Summary

### Auth (2 endpoints)
```
POST   /api/auth/register         - Register new user
POST   /api/auth/login            - Login, receive JWT tokens
```

### Users (3 endpoints)
```
GET    /api/users/:id             - Get user profile
PUT    /api/users/:id             - Update profile
PUT    /api/users/:id/promote-to-owner  - Become facility owner
```

### Facilities (6 endpoints)
```
POST   /api/facilities            - Create facility (owner only)
GET    /api/facilities/:id        - Get facility details
PUT    /api/facilities/:id        - Update facility (owner only)
DELETE /api/facilities/:id        - Delete facility (owner only)
GET    /api/facilities/owner/:ownerId   - List owner's facilities
POST   /api/facilities/search/nearby    - Find nearby courts (PostGIS)
```

### Courts (4 endpoints)
```
POST   /api/courts                - Create court (owner only)
GET    /api/courts/:id            - Get court details
PUT    /api/courts/:id            - Update court (owner only)
DELETE /api/courts/:id            - Delete court (owner only)
```

### TimeSlots (5 endpoints)
```
POST   /api/timeslots             - Create time slot (owner only)
GET    /api/timeslots/:id         - Get time slot
PUT    /api/timeslots/:id         - Update time slot (owner only)
DELETE /api/timeslots/:id         - Delete time slot (owner only)
GET    /api/timeslots/court/:courtId/availability  - Check availability
```

### Bookings (6 endpoints)
```
POST   /api/bookings              - Create booking (player)
GET    /api/bookings/:id          - Get booking details
PUT    /api/bookings/:id/status   - Update booking status
DELETE /api/bookings/:id          - Cancel booking
GET    /api/bookings/user/:userId/all      - User's all bookings
GET    /api/bookings/user/:userId/upcoming - User's upcoming bookings
```

### Tournaments (4 endpoints)
```
POST   /api/tournaments           - Create tournament
GET    /api/tournaments/:id       - Get tournament details
PUT    /api/tournaments/:id       - Update tournament
POST   /api/tournaments/:id/join  - Join tournament
```

### WebSocket Events (6 events)
```
subscribe-facility      - Real-time facility updates
subscribe-court         - Court availability changes
subscribe-user-bookings - Booking notifications
facility:updated        - Facility changed
availability:changed    - Time slot changed
booking:created/status-changed - Booking events
```

---

## Quick Start for Development

### 1. Install Dependencies
```bash
cd C:\Projects\CanchaYa
yarn install --ignore-engines
```

### 2. Start PostgreSQL Database
```bash
docker-compose up -d postgres
```

### 3. Run Database Migrations
```bash
yarn workspace @canchaya/api typeorm:migration:run
```

### 4. Start Development Server
```bash
yarn workspace @canchaya/api dev
```

API runs at: `http://localhost:3000/api`
WebSocket: `ws://localhost:3000`

### 5. Test Authentication
```bash
# Register user
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "SecurePass123", "name": "Test User"}'

# Login (save accessToken)
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "SecurePass123"}'
```

---

## Key Implementation Details

### Authentication Flow
1. User registers with email/password
2. Password hashed with bcrypt
3. Server returns JWT accessToken and refreshToken
4. Client includes `Authorization: Bearer <token>` on protected endpoints
5. Refresh token used to get new accessToken when expired

### PostGIS Geolocation ("Nearby Courts")
1. Facility locations stored as Geography POINT in PostgreSQL
2. Client sends latitude/longitude/radiusKm
3. Backend uses `ST_DWithin` for efficient distance queries
4. Results ordered by distance

### Real-Time Updates (WebSocket)
1. Client connects to WebSocket gateway
2. Client emits `subscribe-<resource>` with resource ID
3. Server broadcasts changes to subscribed clients
4. Events: facility:updated, availability:changed, booking:created, etc.

### Ownership Validation
- Users can only modify their own entities
- Facility owners only manage their facilities/courts/timeslots
- Booking owners only cancel their own bookings

### Role-Based Access
- **"player"**: Can book courts, join tournaments
- **"owner"**: Can manage facilities, courts, timeslots, create tournaments
- Promotion: Player → Owner via `/promote-to-owner` endpoint

---

## Common Development Tasks

### Add New API Endpoint
1. Create DTO in `module/dto/module.dto.ts`
2. Add method to service: `module/services/module.service.ts`
3. Add route to controller: `module/controllers/module.controller.ts`
4. Update module imports if needed: `module/module.module.ts`

### Add New Database Field
1. Update entity: `database/entities/entity.entity.ts`
2. Generate migration: `yarn workspace @canchaya/api typeorm:migration:generate -n MigrationName`
3. Run migration: `yarn workspace @canchaya/api typeorm:migration:run`

### Query Database Directly
```bash
# Connect to PostgreSQL
docker exec -it canchaya-postgres psql -U canchaya -d canchaya_db

# Useful commands inside psql:
\dt                    # List tables
SELECT * FROM users;   # View users
\d users               # Describe users table
```

### View Logs
```bash
# API logs (watch live)
yarn workspace @canchaya/api dev

# Database logs
docker logs -f canchaya-postgres
```

---

## Important Notes for Copilot

### Before Making Changes
1. **Read the docs first** - Understand project structure and current implementation
2. **Check existing code** - Don't duplicate patterns already established
3. **Follow conventions** - Match the coding style and structure of existing modules
4. **Test thoroughly** - Verify changes don't break existing endpoints

### When Implementing Features
1. **Use TypeORM entities** - Don't bypass the ORM for database access
2. **Validate inputs** - Use DTOs for all API inputs
3. **Check permissions** - Ownership and role validation required
4. **Handle errors** - Return proper HTTP status codes and error messages
5. **Document changes** - Update relevant docs if API changes

### When Debugging Issues
1. Check `.env` file for correct configuration
2. Verify PostgreSQL is running: `docker-compose ps`
3. Check database migrations were applied
4. Review controller → service → entity flow
5. Look at error stack traces in console logs

### Repository Best Practices
- **Commits**: "feature: add user profile endpoint" (descriptive)
- **Branches**: `feature/user-profiles` (lowercase, hyphens)
- **Co-author**: Always include Copilot co-author trailer
- **Push**: One logical feature per branch

---

## Documentation Files Reference

- **docs/README.md** - Complete documentation index
- **docs/API_QUICK_START.md** - Quickest way to get started developing
- **docs/PHASE4_BACKEND_COMPLETE.md** - Comprehensive backend documentation
- **docs/DATABASE_SETUP.md** - Database schema and setup details
- **docs/IMPLEMENTATION_PLAN.md** - Original product specification and feature list
- **docs/architecture.md** - System architecture and design
- **docs/rules.md** - Development rules and project structure
- **docs/product.md** - Product vision and user stories
- **docs/ux.md** - UX principles and design guidelines

---

## Contact & Support

### For Issues
1. Check API_QUICK_START.md troubleshooting section
2. Review PHASE4_BACKEND_COMPLETE.md for implementation details
3. Check database logs: `docker logs canchaya-postgres`
4. Check API logs: `yarn workspace @canchaya/api dev` (verbose output)

### What's Documented
- All 37 API endpoints with examples
- All 8 modules and their responsibilities
- Database schema and entity relationships
- Authentication and authorization flow
- WebSocket real-time subscriptions
- Development workflow and best practices

---

## Status: ✅ Phase 4 Complete

**The backend API is production-ready and fully documented.**

Next steps:
1. Start Phase 5 (Mobile App) or Phase 6 (Web Dashboard)
2. Implement integration tests
3. Deploy staging environment
4. Set up continuous integration/deployment

---

**Last Updated**: March 18, 2026  
**Version**: 1.0.0 Phase 4  
**Status**: ✅ Production Ready
