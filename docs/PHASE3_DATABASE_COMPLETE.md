# Phase 3: Database Schema - Complete ✅

## What Was Accomplished

### 1. Complete SQL Schema (`docker/schema.sql`)
- 7 tables with full relationships
- PostGIS integration for geolocation
- Automatic timestamp triggers
- Performance indexes
- 3 analytical views
- Foreign key constraints with cascading deletes

### 2. TypeORM Configuration (`apps/api/typeorm.config.ts`)
- Data source setup for development & production
- All entities configured
- Migration support ready

### 3. Entity Documentation (`apps/api/DATABASE_ENTITIES.md`)
- 7 complete TypeORM entity files with code
- Relationships and decorators
- AppModule integration instructions
- PostGIS queries examples

### 4. Database Migration Template (`apps/api/1710589000000-InitialSchema.ts`)
- TypeORM migration class
- Up/Down methods for schema creation/rollback
- Ready to use or customize

### 5. Comprehensive Setup Guide (`docs/DATABASE_SETUP.md`)
- Step-by-step implementation instructions
- Common queries (search, availability, analytics)
- Performance tuning guide
- Troubleshooting section

## Database Schema Summary

### Tables Created

| Table | Purpose | Key Fields |
|-------|---------|-----------|
| **users** | Player & facility owner accounts | id, email, role, oauth_provider, oauth_id |
| **facilities** | Padel courts facilities | id, owner_id, location (PostGIS), name, address |
| **courts** | Individual courts | id, facility_id, surface, has_lights, capacity |
| **timeslots** | Available time slots | id, court_id, start_time, end_time, price |
| **bookings** | Player bookings | id, user_id, timeslot_id, status, total_price |
| **tournaments** | Tournaments (Phase 2) | id, facility_id, name, max_participants, status |
| **tournament_participants** | Tournament enrollment | id, tournament_id, user_id |

### Indexes Created
- **Primary keys**: All tables
- **Unique**: email (users)
- **Foreign keys**: All relationships
- **Performance**: user_id, status, created_at, court_id
- **Spatial**: location (GIST index for PostGIS queries)
- **Composite**: (user_id, status), (court_id, surface), etc.

### Views Created
1. **v_nearby_facilities** - For court discovery search
2. **v_facility_availability** - For availability display
3. **v_facility_owner_dashboard** - For owner analytics

## Key Design Decisions

✅ **PostGIS Geography (not Geometry)**
- Accurate distance calculations on Earth's surface
- Default to 4326 (WGS 84) coordinate system
- Uses meters for distance calculations

✅ **Automatic Timestamps**
- `created_at`: Set on INSERT
- `updated_at`: Auto-updated via trigger
- Helps track booking history & analytics

✅ **Cascade Deletes**
- Deleting facility deletes its courts
- Deleting court deletes timeslots
- Deleting timeslot deletes bookings
- Maintains referential integrity

✅ **Check Constraints**
- Enums: role, surface, booking status, tournament status
- Date validation: end_time > start_time
- Prevents invalid data at database level

## Files Created

### Configuration Files
```
/docker/schema.sql                          # Complete SQL schema (8.9 KB)
/apps/api/typeorm.config.ts                 # TypeORM config (1.2 KB)
/apps/api/1710589000000-InitialSchema.ts    # Migration file (9.2 KB)
```

### Documentation Files
```
/apps/api/DATABASE_ENTITIES.md              # Entity templates (11.4 KB)
/docs/DATABASE_SETUP.md                     # Setup guide (8.8 KB)
```

## Next Steps (Phase 4+)

Ready to implement:

### Phase 4: Backend Modules (API Endpoints)
- ✅ **auth-module** - JWT authentication + OAuth
- ✅ **users-module** - User profiles
- ✅ **facilities-module** - Facility CRUD + geolocation search
- ✅ **courts-module** - Court management
- ✅ **timeslots-module** - Availability & pricing
- ✅ **bookings-module** - Booking system
- ✅ **tournaments-module** - Tournament management
- ✅ **websocket-gateway** - Real-time updates

### Phase 5: Mobile App
- ✅ **mobile-init** - Expo setup

### Phase 6: Web App
- ✅ **web-init** - React Native Web setup

## How to Use This Schema

### Option 1: Manual Setup (Recommended for Development)

1. Start PostgreSQL:
   ```bash
   docker-compose up -d postgres
   ```

2. Create entity files from `DATABASE_ENTITIES.md`:
   ```bash
   mkdir -p apps/api/src/database/entities
   # Copy entity files from DATABASE_ENTITIES.md
   ```

3. Move migration file:
   ```bash
   mkdir -p apps/api/src/database/migrations
   mv apps/api/1710589000000-InitialSchema.ts apps/api/src/database/migrations/
   ```

4. Update app.module.ts with TypeORM config

5. Run migration:
   ```bash
   yarn workspace @canchaya/api typeorm:migration:run
   ```

### Option 2: Direct SQL Execution

```bash
# Connect to database container
docker exec -it canchaya-postgres psql -U canchaya -d canchaya_db

# Run schema
\i /docker/schema.sql
```

## Verification

After setup, verify tables exist:

```sql
SELECT * FROM information_schema.tables WHERE table_schema='public';

-- Should show 7 tables:
-- - users
-- - facilities
-- - courts
-- - timeslots
-- - bookings
-- - tournaments
-- - tournament_participants
```

Test PostGIS:

```sql
SELECT ST_Distance(
  ST_GeogFromText('POINT(-58.3816 -34.6037)')::geography,
  ST_GeogFromText('POINT(-58.3819 -34.6040)')::geography
) as distance_meters;
```

## Status

- ✅ Database schema complete
- ✅ TypeORM entities documented
- ✅ Migration ready to execute
- ✅ PostGIS configured
- ✅ Performance indexes designed
- 🚀 Ready for Phase 4: Backend API modules

---

See `/docs/DATABASE_SETUP.md` for detailed implementation instructions.
