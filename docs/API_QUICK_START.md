# CanchaYa API - Quick Start Guide

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18.0.0
- Docker & Docker Compose
- PostgreSQL 16 with PostGIS

### 1. Install Dependencies
```bash
cd C:\Projects\CanchaYa

# Option A: Using yarn (recommended for monorepo)
yarn install --ignore-engines

# Option B: Using npm
npm install --legacy-peer-deps
```

### 2. Start PostgreSQL with PostGIS
```bash
docker-compose up -d postgres
```

Verify it's running:
```bash
docker-compose ps
```

### 3. Run Database Migrations
```bash
yarn workspace @canchaya/api typeorm:migration:run
```

### 4. Start Development Server
```bash
yarn workspace @canchaya/api dev
```

The API will start at: **http://localhost:3000/api**

---

## 🔑 Authentication Flow

### Step 1: Register New User
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "SecurePassword123",
    "name": "John Doe"
  }'
```

**Response**:
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "name": "John Doe",
  "role": "player",
  "accessToken": "eyJhbG...",
  "refreshToken": "eyJhbG..."
}
```

### Step 2: Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "SecurePassword123"
  }'
```

**Save the `accessToken`** - you'll need it for all subsequent requests.

### Step 3: Use Token for Protected Endpoints
Add to all requests:
```bash
-H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

---

## 🏢 Facility Owner Workflow

### 1. Promote User to Facility Owner
```bash
curl -X PUT http://localhost:3000/api/users/{userId}/promote-to-owner \
  -H "Authorization: Bearer {token}"
```

### 2. Create Facility
```bash
curl -X POST "http://localhost:3000/api/facilities?userId={userId}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {token}" \
  -d '{
    "name": "Buenos Aires Padel Center",
    "description": "Premium padel courts in downtown",
    "address": "Av. Corrientes 123",
    "city": "Buenos Aires",
    "latitude": -34.6037,
    "longitude": -58.3816,
    "phone": "+54-11-1234-5678",
    "website": "www.example.com"
  }'
```

### 3. Add Court to Facility
```bash
curl -X POST "http://localhost:3000/api/courts?facilityId={facilityId}&userId={userId}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {token}" \
  -d '{
    "name": "Court A",
    "surface": "artificial",
    "hasLights": true,
    "capacity": 4
  }'
```

### 4. Create Time Slots
```bash
curl -X POST "http://localhost:3000/api/timeslots?courtId={courtId}&facilityId={facilityId}&userId={userId}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {token}" \
  -d '{
    "startTime": "2026-03-16T09:00:00Z",
    "endTime": "2026-03-16T10:00:00Z",
    "price": 500,
    "available": true
  }'
```

---

## 👤 Player Workflow

### 1. Search Nearby Courts
```bash
curl -X POST http://localhost:3000/api/facilities/search/nearby \
  -H "Content-Type: application/json" \
  -d '{
    "latitude": -34.6037,
    "longitude": -58.3816,
    "radiusKm": 5,
    "limit": 20
  }'
```

### 2. View Facility Details
```bash
curl -X GET http://localhost:3000/api/facilities/{facilityId}
```

### 3. Check Court Availability
```bash
curl -X GET "http://localhost:3000/api/timeslots/court/{courtId}/availability?startDate=2026-03-16T00:00:00Z&endDate=2026-03-16T23:59:59Z"
```

### 4. Book a Court
```bash
curl -X POST "http://localhost:3000/api/bookings?userId={playerId}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {token}" \
  -d '{
    "timeSlotId": "{timeSlotId}",
    "notes": "Booking for tomorrow with friends"
  }'
```

### 5. View My Bookings
```bash
curl -X GET http://localhost:3000/api/bookings/user/{userId}/all \
  -H "Authorization: Bearer {token}"
```

### 6. View Upcoming Bookings
```bash
curl -X GET http://localhost:3000/api/bookings/user/{userId}/upcoming \
  -H "Authorization: Bearer {token}"
```

### 7. Cancel Booking
```bash
curl -X DELETE "http://localhost:3000/api/bookings/{bookingId}?userId={userId}" \
  -H "Authorization: Bearer {token}"
```

---

## 🔄 Real-Time Updates (WebSocket)

### Subscribe to Facility Updates
```javascript
const socket = io('ws://localhost:3000');

// Subscribe to facility
socket.emit('subscribe-facility', 'facility-id-here');

// Listen for updates
socket.on('facility:updated', (facility) => {
  console.log('Facility updated:', facility);
});
```

### Subscribe to Court Availability
```javascript
socket.emit('subscribe-court', 'court-id-here');

socket.on('availability:changed', (timeSlot) => {
  console.log('Availability changed:', timeSlot);
});

socket.on('price:updated', ({ timeSlotId, newPrice }) => {
  console.log(`Price updated: ${newPrice}`);
});
```

### Subscribe to User Bookings
```javascript
socket.emit('subscribe-user-bookings', 'user-id-here');

socket.on('booking:created', (booking) => {
  console.log('New booking:', booking);
});

socket.on('booking:status-changed', (booking) => {
  console.log('Booking status:', booking.status);
});
```

---

## 📊 Database Queries

### Find Nearby Facilities (SQL)
```sql
SELECT 
  id, name, address, city,
  ST_Distance(location::geography, ST_GeogFromText('POINT(-58.3816 -34.6037)')::geography) as distance_m
FROM facilities
WHERE ST_DWithin(location::geography, ST_GeogFromText('POINT(-58.3816 -34.6037)')::geography, 5000)
ORDER BY distance_m
LIMIT 20;
```

### Get Court Availability (SQL)
```sql
SELECT 
  f.name as facility,
  c.name as court,
  ts.start_time,
  ts.end_time,
  ts.price,
  COUNT(b.id) as booking_count
FROM facilities f
JOIN courts c ON f.id = c.facility_id
JOIN timeslots ts ON c.id = ts.court_id
LEFT JOIN bookings b ON ts.id = b.timeslot_id AND b.status = 'confirmed'
WHERE ts.start_time > NOW()
GROUP BY f.id, c.id, ts.id
ORDER BY f.name, ts.start_time;
```

---

## 🛠️ Development Tips

### View Logs
```bash
# Watch PostgreSQL logs
docker logs -f canchaya-postgres

# Connect to DB directly
docker exec -it canchaya-postgres psql -U canchaya -d canchaya_db
```

### Useful SQL Commands
```sql
-- List all tables
\dt

-- Show users
SELECT id, email, name, role FROM users;

-- Show facilities with owners
SELECT f.id, f.name, u.name as owner FROM facilities f JOIN users u ON f.owner_id = u.id;

-- Show bookings
SELECT b.id, u.name, ts.start_time, b.status FROM bookings b 
JOIN users u ON b.user_id = u.id 
JOIN timeslots ts ON b.timeslot_id = ts.id;
```

### Generate TypeORM Migration After Schema Changes
```bash
# After modifying entities
yarn workspace @canchaya/api typeorm:migration:generate -n MigrationName

# Run migrations
yarn workspace @canchaya/api typeorm:migration:run

# Revert last migration
yarn workspace @canchaya/api typeorm:migration:revert
```

---

## 🐛 Troubleshooting

### Issue: "Cannot find module @nestjs/..."
**Solution**: Run `yarn install --ignore-engines`

### Issue: "Database connection refused"
**Solution**: 
- Ensure PostgreSQL is running: `docker-compose ps`
- Check credentials in `.env` file
- Verify PostgreSQL is healthy: `docker logs canchaya-postgres`

### Issue: PostGIS functions not available
**Solution**: Migrations automatically create PostGIS extensions. Run:
```bash
yarn workspace @canchaya/api typeorm:migration:run
```

### Issue: Port 3000 already in use
**Solution**: 
```bash
# Change port in .env
PORT=3001

# Or kill existing process
lsof -i :3000
kill -9 <PID>
```

---

## 📚 API Documentation

All endpoints are prefixed with `/api`

### Auth Endpoints
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user

### Users Endpoints
- `GET /users/:id` - Get user profile
- `PUT /users/:id` - Update profile
- `PUT /users/:id/promote-to-owner` - Become facility owner

### Facilities Endpoints
- `POST /facilities` - Create facility
- `GET /facilities/:id` - Get facility details
- `PUT /facilities/:id` - Update facility
- `DELETE /facilities/:id` - Delete facility
- `GET /facilities/owner/:ownerId` - List owner's facilities
- `POST /facilities/search/nearby` - Search nearby facilities

### Courts Endpoints
- `POST /courts` - Create court
- `GET /courts/:id` - Get court details
- `PUT /courts/:id` - Update court
- `DELETE /courts/:id` - Delete court
- `GET /courts/facility/:facilityId` - List facility courts

### TimeSlots Endpoints
- `POST /timeslots` - Create time slot
- `GET /timeslots/:id` - Get time slot
- `PUT /timeslots/:id` - Update time slot
- `DELETE /timeslots/:id` - Delete time slot
- `GET /timeslots/court/:courtId/availability` - Check availability

### Bookings Endpoints
- `POST /bookings` - Create booking
- `GET /bookings/:id` - Get booking details
- `PUT /bookings/:id/status` - Update booking status
- `DELETE /bookings/:id` - Cancel booking
- `GET /bookings/user/:userId/all` - List all user bookings
- `GET /bookings/user/:userId/upcoming` - List upcoming bookings

### Tournaments Endpoints
- `POST /tournaments` - Create tournament
- `GET /tournaments/:id` - Get tournament
- `PUT /tournaments/:id` - Update tournament
- `POST /tournaments/:id/join` - Join tournament

---

## 🎯 What's Next?

1. **Phase 5: Mobile App** - React Native + Expo
2. **Phase 6: Web Dashboard** - React admin panel
3. **Phase 7: Payments** - Stripe/MercadoPago integration
4. **Phase 8: Advanced Features** - Matchmaking, rankings, ratings

---

**Version**: 1.0.0
**Last Updated**: March 15, 2026
**Status**: ✅ Production Ready
