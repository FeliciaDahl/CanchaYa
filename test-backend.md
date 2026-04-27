# Backend API Testing Script

## Prerequisites
- PostgreSQL running on localhost:5432
- Database migrations applied
- API running on http://localhost:3000

## Manual Testing Steps

### 1. Register a User
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "testuser@example.com",
    "password": "TestPassword123",
    "name": "Test User"
  }'
```

Expected Response: User created successfully

### 2. Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "testuser@example.com",
    "password": "TestPassword123"
  }'
```

Expected Response: { "accessToken": "...", "refreshToken": "..." }

### 3. Get User Profile (requires auth token from login)
```bash
curl -X GET http://localhost:3000/api/users/me \
  -H "Authorization: Bearer <accessToken>"
```

### 4. Create a Facility (requires owner role)
```bash
curl -X POST http://localhost:3000/api/facilities \
  -H "Authorization: Bearer <accessToken>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Padel Club Centro",
    "description": "Central padel court facility",
    "address": "Avenida 9 de Julio 1234",
    "city": "Buenos Aires",
    "latitude": -34.6037,
    "longitude": -58.3816,
    "phone": "+5411234567890",
    "website": "www.padelcentro.com"
  }'
```

### 5. Get Nearby Facilities (Geolocation Search)
```bash
curl -X GET "http://localhost:3000/api/facilities/nearby?latitude=-34.6037&longitude=-58.3816&radiusKm=5" \
  -H "Authorization: Bearer <accessToken>"
```

Expected: List of facilities within 5km

## Status
- [ ] API Server Started
- [ ] Database Connected
- [ ] Auth/Register Working
- [ ] Auth/Login Working
- [ ] User Profile Working
- [ ] Facility CRUD Working
- [ ] Geolocation Search Working
