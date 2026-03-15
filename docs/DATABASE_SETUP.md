# Phase 3: Database Schema Implementation Guide

## Overview

Phase 3 implements the complete database layer for CanchaYa using TypeORM with PostgreSQL and PostGIS. The schema includes 7 tables with proper relationships, indexes, and triggers.

## Files Created

### 1. Docker & Schema Files
- **`docker/schema.sql`** - Complete SQL schema with all tables, views, and indexes
- **`docker/init.sql`** - PostgreSQL initialization (extensions)

### 2. TypeORM Configuration
- **`apps/api/typeorm.config.ts`** - TypeORM data source configuration
- **`apps/api/DATABASE_ENTITIES.md`** - Complete entity file templates
- **`apps/api/1710589000000-InitialSchema.ts`** - Migration file

### 3. Entity Files (to create manually in `apps/api/src/database/entities/`)
- `user.entity.ts` - User accounts (players, facility owners)
- `facility.entity.ts` - Padel facilities with PostGIS location
- `court.entity.ts` - Individual courts within facilities
- `timeslot.entity.ts` - Available time slots with pricing
- `booking.entity.ts` - Bookings made by players
- `tournament.entity.ts` - Tournaments (Phase 2)
- `tournament-participant.entity.ts` - Tournament participants

## Database Architecture

### 7 Core Tables

```
users (1) ──┬─→ (many) facilities
            └─→ (many) bookings
                       │
facilities (1) ─→ (many) courts ─→ (many) timeslots ─→ (many) bookings
              └─→ (many) tournaments
                              │
                              └─→ (many) tournament_participants
                                             │
                                             └─→ users
```

### Key Features

✅ **PostGIS Integration**
- `facilities.location` stored as Geography POINT
- Enables distance-based queries for "nearby courts" feature
- Efficient spatial indexing with GIST

✅ **Proper Relationships**
- One-to-many: User → Facilities, Bookings
- One-to-many: Facility → Courts, Tournaments
- One-to-many: Court → TimeSlots
- One-to-many: TimeSlot → Bookings
- Many-to-many: Tournament ↔ Users (via TournamentParticipant)

✅ **Automatic Timestamps**
- `created_at`: Set automatically on insert
- `updated_at`: Auto-updated on every change via trigger

✅ **Performance Indexes**
- B-tree indexes on foreign keys & frequently filtered columns
- GIST index on PostGIS location for spatial queries
- Composite indexes for common query patterns

✅ **Data Integrity**
- Unique constraint on email
- Check constraints for enums
- Foreign key cascading deletes
- Timestamp validation (endTime > startTime)

## Setup Steps

### Step 1: Update Package.json

Add TypeORM CLI scripts to `apps/api/package.json`:

```json
{
  "scripts": {
    "typeorm": "typeorm-cli",
    "typeorm:migration:create": "typeorm migration:create",
    "typeorm:migration:generate": "typeorm migration:generate -d ./typeorm.config.ts",
    "typeorm:migration:run": "typeorm migration:run -d ./typeorm.config.ts",
    "typeorm:migration:revert": "typeorm migration:revert -d ./typeorm.config.ts"
  },
  "devDependencies": {
    "typeorm": "^0.3.17"
  }
}
```

### Step 2: Start PostgreSQL

```bash
docker-compose up -d postgres
```

Verify it's running:
```bash
docker-compose ps
```

### Step 3: Create Entity Files

Copy the code from `DATABASE_ENTITIES.md` and create these files:

```bash
# Create directory structure
mkdir -p apps/api/src/database/entities
mkdir -p apps/api/src/database/migrations

# Create entity files (copy from DATABASE_ENTITIES.md)
# - user.entity.ts
# - facility.entity.ts
# - court.entity.ts
# - timeslot.entity.ts
# - booking.entity.ts
# - tournament.entity.ts
# - tournament-participant.entity.ts
```

### Step 4: Create Index/Barrel Export

Create `apps/api/src/database/entities/index.ts`:

```typescript
export { User } from './user.entity';
export { Facility } from './facility.entity';
export { Court } from './court.entity';
export { TimeSlot } from './timeslot.entity';
export { Booking } from './booking.entity';
export { Tournament } from './tournament.entity';
export { TournamentParticipant } from './tournament-participant.entity';
```

### Step 5: Copy Migration File

Copy `apps/api/1710589000000-InitialSchema.ts` to `apps/api/src/database/migrations/`

### Step 6: Update App Module

Update `apps/api/src/app.module.ts` with TypeORM configuration (see `DATABASE_ENTITIES.md`)

### Step 7: Run Migration

```bash
# Option 1: Run pre-built migration
yarn workspace @canchaya/api typeorm:migration:run

# Option 2: Execute schema.sql directly
docker exec canchaya-postgres psql -U canchaya -d canchaya_db -f /docker/schema.sql
```

### Step 8: Verify Schema

```bash
# Connect to database
docker exec -it canchaya-postgres psql -U canchaya -d canchaya_db

# Inside psql:
\dt                    # List tables
\d users               # Describe users table
SELECT * FROM information_schema.tables WHERE table_schema='public';
```

## Database Queries

### Find Nearby Facilities (5km radius)

```sql
SELECT 
  id, name, address, city,
  ST_Distance(location::geography, ST_GeogFromText('POINT(-58.3816 -34.6037)')::geography) as distance_m
FROM facilities
WHERE ST_DWithin(location::geography, ST_GeogFromText('POINT(-58.3816 -34.6037)')::geography, 5000)
ORDER BY distance_m
LIMIT 20;
```

### Get Court Availability

```sql
SELECT 
  f.name as facility,
  c.name as court,
  ts.start_time,
  ts.end_time,
  ts.price,
  COUNT(b.id) as booking_count,
  CASE WHEN COUNT(b.id) > 0 THEN 'booked' ELSE 'available' END as status
FROM facilities f
JOIN courts c ON f.id = c.facility_id
JOIN timeslots ts ON c.id = ts.court_id
LEFT JOIN bookings b ON ts.id = b.timeslot_id AND b.status = 'confirmed'
WHERE ts.start_time > NOW()
GROUP BY f.id, c.id, ts.id
ORDER BY f.name, ts.start_time;
```

### Facility Owner Dashboard

```sql
SELECT 
  f.id,
  f.name,
  COUNT(DISTINCT c.id) as courts,
  COUNT(DISTINCT ts.id) as available_slots,
  COUNT(DISTINCT CASE WHEN b.status = 'confirmed' THEN b.id END) as confirmed_bookings,
  SUM(CASE WHEN b.status = 'completed' THEN b.total_price ELSE 0 END) as revenue
FROM facilities f
LEFT JOIN courts c ON f.id = c.facility_id
LEFT JOIN timeslots ts ON c.id = ts.court_id AND ts.available = TRUE
LEFT JOIN bookings b ON ts.id = b.timeslot_id
WHERE f.owner_id = :owner_id
GROUP BY f.id;
```

## Views Created

### 1. v_nearby_facilities
Used for court discovery search with distance calculation

### 2. v_facility_availability
Used for showing available courts and time slots

### 3. v_facility_owner_dashboard
Used for owner analytics and statistics

## Common Issues & Solutions

### Issue: UUID type not recognized
**Solution**: Ensure PostgreSQL uuid-ossp extension is created:
```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

### Issue: PostGIS functions not available
**Solution**: Install PostGIS extension:
```sql
CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS postgis_topology;
```

### Issue: Migration fails with "table already exists"
**Solution**: Drop existing tables and re-run:
```bash
yarn workspace @canchaya/api typeorm:migration:revert
yarn workspace @canchaya/api typeorm:migration:run
```

### Issue: Spatial query returns empty results
**Solution**: Ensure location is stored as Geography (not Geometry):
```sql
SELECT ST_GeomFromText('POINT(-58.3816 -34.6037)', 4326)::geography;
```

## Performance Tuning

### Spatial Queries (PostGIS)
- Use `ST_DWithin` with Geography for accurate distance (in meters)
- Add GIST index: `CREATE INDEX ON facilities USING GIST(location)`
- Consider BRIN index for very large datasets

### Booking Queries
- Composite index on `(user_id, status)` for user's bookings
- Index on `status` for filtering by status
- Index on `created_at DESC` for recent bookings

### Availability Queries
- Index on `(court_id, available)` for checking availability
- Index on `start_time` for date range queries
- Index on `(court_id, start_time)` for common queries

## Next Steps

1. ✅ Create all entity files in `src/database/entities/`
2. ✅ Update `app.module.ts` with TypeORM config
3. ✅ Run migrations to create schema
4. ⏭️ **Phase 4**: Implement Auth module
5. ⏭️ **Phase 5**: Implement Users module
6. ⏭️ **Phase 6**: Implement Facilities module
7. ⏭️ **Phase 7**: Implement Bookings & Search

## Related Files

- `/docs/IMPLEMENTATION_PLAN.md` - Product plan with data model
- `/docker/schema.sql` - Complete SQL schema
- `/apps/api/DATABASE_ENTITIES.md` - Entity code templates
- `/apps/api/typeorm.config.ts` - TypeORM configuration
