# CanchaYa - Product & Implementation Plan

## Executive Summary

CanchaYa is a two-sided marketplace for booking padel courts in Argentina. MVP focuses on mobile-first player experience with a full facility dashboard. Payments handled separately (Phase 2). Tournaments are Phase 2 feature.

**Target Launch**: MVP with mobile app + web admin dashboard

---

## Product Vision

### Mission
From "ganas de jugar" to "court booked" in under 10 seconds on mobile.

### Market
Argentina padel courts / players

### Users
1. **Players**: Discover, book courts in <10s
2. **Facility Owners**: Manage courts, pricing, bookings, view analytics

---

## MVP Scope Definition

### ✅ IN MVP (Phase 1 Launch)

#### Core Player Features
- User registration (email/password + social: Google, Apple)
- Browse nearby courts (geolocation-based with PostGIS)
- View court details (surface, lights, capacity, availability)
- Book court in max 3 taps
- View my bookings (upcoming, past)
- Cancel booking
- Real-time availability updates (WebSocket)
- Dark mode UI with high contrast
- Push notifications for booking confirmations

#### Core Facility Owner Features
- Register as facility owner
- Create and manage facility profile
- Add multiple courts to facility
- Set availability schedule
- Set pricing per time slot
- View all bookings (calendar view)
- Accept/reject bookings
- View basic analytics (bookings, revenue)
- Manage facility settings

#### Backend Core
- JWT authentication with social login integration
- Database schema (User, Facility, Court, TimeSlot, Booking)
- REST API endpoints for all features
- WebSocket gateway for real-time updates
- PostGIS geolocation search
- Role-based access control (player vs owner)

### 🚫 OUT OF MVP (Phase 2+)

- Payment processing (handle separately)
- Tournaments feature
- User ratings/reviews
- Matchmaking engine
- Rankings system
- Shared court bookings
- Admin dashboard
- Advanced analytics/reporting
- Multi-language support
- Global expansion

---

## EPICS & FEATURES BREAKDOWN

### EPIC 1: Player Mobile App (MVP-Critical)
**Timeline**: Priority 1

#### Feature 1.1: Authentication & Onboarding
- PBI 1.1.1: Email/password registration
- PBI 1.1.2: Google OAuth integration
- PBI 1.1.3: Apple OAuth integration
- PBI 1.1.4: Forgot password flow
- PBI 1.1.5: Profile setup onboarding

#### Feature 1.2: Discovery & Search
- PBI 1.2.1: List nearby courts (geolocation-based)
- PBI 1.2.2: Filter by distance, price, surface type, lights
- PBI 1.2.3: Court detail screen
- PBI 1.2.4: Real-time availability display
- PBI 1.2.5: Favorite courts (save for later)

#### Feature 1.3: Booking Flow
- PBI 1.3.1: Select time slot
- PBI 1.3.2: Review booking details
- PBI 1.3.3: Confirm booking (max 3 taps total)
- PBI 1.3.4: Booking confirmation screen & notification
- PBI 1.3.5: Booking receipt/details

#### Feature 1.4: My Bookings
- PBI 1.4.1: List upcoming bookings
- PBI 1.4.2: List past bookings
- PBI 1.4.3: Cancel upcoming booking
- PBI 1.4.4: Booking status tracking (confirmed, cancelled, completed)
- PBI 1.4.5: View booking details & court location

#### Feature 1.5: UI/UX
- PBI 1.5.1: Dark mode theme (default)
- PBI 1.5.2: High contrast colors
- PBI 1.5.3: Large touch targets (accessibility)
- PBI 1.5.4: Fast navigation (<1s between screens)
- PBI 1.5.5: Loading states & error handling

#### Feature 1.6: Notifications
- PBI 1.6.1: Push notification on booking confirmation
- PBI 1.6.2: Booking reminder (1 hour before)
- PBI 1.6.3: Availability alerts (court became available)
- PBI 1.6.4: Notification preferences settings

---

### EPIC 2: Facility Owner Web Dashboard (MVP-Critical)
**Timeline**: Priority 2 (parallel with EPIC 1)

#### Feature 2.1: Facility Management
- PBI 2.1.1: Create facility profile
- PBI 2.1.2: Edit facility details (name, address, phone, website)
- PBI 2.1.3: Upload facility photos
- PBI 2.1.4: Set facility location (map picker with PostGIS)
- PBI 2.1.5: Multiple facility support

#### Feature 2.2: Court Management
- PBI 2.2.1: Add courts to facility
- PBI 2.2.2: Define court properties (surface type, lighting)
- PBI 2.2.3: Edit court details
- PBI 2.2.4: Delete courts
- PBI 2.2.5: Bulk operations (import courts CSV)

#### Feature 2.3: Availability & Pricing
- PBI 2.3.1: Set operating hours (daily schedule)
- PBI 2.3.2: Create time slots (30 min / 1 hour intervals)
- PBI 2.3.3: Set pricing per time slot
- PBI 2.3.4: Dynamic pricing (peak hours vs off-peak)
- PBI 2.3.5: Holidays & blackout dates
- PBI 2.3.6: Bulk pricing updates

#### Feature 2.4: Booking Management
- PBI 2.4.1: Calendar view of all bookings
- PBI 2.4.2: Accept/reject pending bookings
- PBI 2.4.3: Cancel booking (with reason)
- PBI 2.4.4: Booking details & customer info
- PBI 2.4.5: Export bookings (CSV)
- PBI 2.4.6: Search/filter bookings

#### Feature 2.5: Analytics & Reporting
- PBI 2.5.1: Total bookings (today, week, month)
- PBI 2.5.2: Revenue tracking (estimated - since no payments in MVP)
- PBI 2.5.3: Occupancy rate per court
- PBI 2.5.4: Popular time slots
- PBI 2.5.5: Customer demographics (basic)
- PBI 2.5.6: Export reports

#### Feature 2.6: Account Management
- PBI 2.6.1: Facility owner profile
- PBI 2.6.2: Change password
- PBI 2.6.3: Bank account setup (for future payments)
- PBI 2.6.4: Notifications preferences
- PBI 2.6.5: Support chat / help

---

### EPIC 3: Backend API & Infrastructure (Foundation)
**Timeline**: Priority 1 (parallel with EPIC 1)

#### Feature 3.1: Authentication & Authorization
- PBI 3.1.1: JWT token generation & refresh
- PBI 3.1.2: Google OAuth provider integration
- PBI 3.1.3: Apple OAuth provider integration
- PBI 3.1.4: Role-based access control (player, owner, admin)
- PBI 3.1.5: Secure password hashing (bcrypt)

#### Feature 3.2: User Management
- PBI 3.2.1: User registration endpoint
- PBI 3.2.2: User profile CRUD
- PBI 3.2.3: Email verification
- PBI 3.2.4: Password reset flow

#### Feature 3.3: Facility Management API
- PBI 3.3.1: Facility CRUD endpoints
- PBI 3.3.2: Ownership validation
- PBI 3.3.3: Location storage (PostGIS point)
- PBI 3.3.4: Facility photos upload (S3 or similar)

#### Feature 3.4: Court Management API
- PBI 3.4.1: Court CRUD endpoints
- PBI 3.4.2: Court attributes (surface, lights, capacity)
- PBI 3.4.3: Bulk court operations

#### Feature 3.5: Availability & TimeSlots API
- PBI 3.5.1: TimeSlot CRUD
- PBI 3.5.2: Availability calculation
- PBI 3.5.3: Pricing rules engine
- PBI 3.5.4: Blackout date handling

#### Feature 3.6: Booking System API
- PBI 3.6.1: Create booking
- PBI 3.6.2: Update booking status
- PBI 3.6.3: Cancel booking
- PBI 3.6.4: List user bookings (paginated)
- PBI 3.6.5: List facility bookings (paginated)

#### Feature 3.7: Search & Discovery API
- PBI 3.7.1: Nearby facilities search (PostGIS radius query)
- PBI 3.7.2: Filter by price, surface, availability
- PBI 3.7.3: Sorting (distance, price, rating)
- PBI 3.7.4: Pagination support

#### Feature 3.8: Real-time Updates (WebSocket)
- PBI 3.8.1: WebSocket gateway setup
- PBI 3.8.2: Booking notification events
- PBI 3.8.3: Availability change events
- PBI 3.8.4: Price update events
- PBI 3.8.5: Connection management

---

## Data Model

### Database Entities

```
USER
├── id (UUID, PK)
├── email (unique)
├── password_hash
├── name
├── phone
├── avatar_url
├── role (player | facility_owner | admin)
├── oauth_provider (google | apple | null)
├── oauth_id
├── email_verified (boolean)
├── created_at
├── updated_at

FACILITY
├── id (UUID, PK)
├── owner_id (FK → USER)
├── name
├── description
├── address
├── city
├── location (PostGIS POINT - for spatial queries)
├── phone
├── website
├── image_urls (JSON array)
├── created_at
├── updated_at

COURT
├── id (UUID, PK)
├── facility_id (FK → FACILITY)
├── name
├── surface (clay | artificial | hard)
├── has_lights (boolean)
├── capacity (int)
├── created_at
├── updated_at

TIMESLOT
├── id (UUID, PK)
├── court_id (FK → COURT)
├── start_time (datetime)
├── end_time (datetime)
├── price (decimal)
├── available (boolean)
├── created_at
├── updated_at

BOOKING
├── id (UUID, PK)
├── user_id (FK → USER)
├── timeslot_id (FK → TIMESLOT)
├── status (pending | confirmed | cancelled | completed)
├── total_price (decimal)
├── notes (optional)
├── created_at
├── updated_at

TOURNAMENT (Phase 2)
├── (to be defined)
```

---

## Technical Architecture

### Frontend (Mobile)
- **Framework**: React Native + Expo
- **Language**: TypeScript
- **State**: Redux or Zustand
- **Navigation**: React Navigation (bottom tabs + stack)
- **UI Components**: React Native Paper or custom
- **Theme**: Dark mode default + high contrast

### Frontend (Web)
- **Framework**: React Native Web or pure React
- **Language**: TypeScript
- **Admin UI**: Material-UI or Chakra
- **Charts**: Recharts or Chart.js
- **Calendar**: React Big Calendar or similar

### Backend
- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: PostgreSQL + PostGIS
- **ORM**: TypeORM with migrations
- **Authentication**: JWT + Passport
- **Real-time**: WebSocket (Socket.IO)
- **Caching**: Redis (optional Phase 2)
- **File Storage**: S3-compatible or local

### DevOps
- **Containers**: Docker + Docker Compose
- **Database**: PostgreSQL 16 with PostGIS
- **CI/CD**: GitHub Actions (Phase 2)
- **Monitoring**: TBD (Phase 2)

---

## Key Decision Log

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Payment | Skip MVP | Focus on core booking experience first |
| Tournaments | Phase 2 | Nice-to-have, not MVP-critical |
| Platform Priority | Mobile-first | Argentina market uses mobile heavily |
| Authentication | Social + Email | Faster signup, better UX |
| Real-time | WebSocket | <10s booking requires live updates |
| Geography | Argentina only | Simplify initial launch |
| User Profiles | Phase 2 | MVP focuses on booking, not community |
| Facility Owner Approval | Accept/Reject Bookings | Gives owners control over bookings |

---

## Open Questions for Future Phases

- [ ] Payment processor: Stripe vs MercadoPago vs other?
- [ ] Push notifications: Firebase or custom?
- [ ] File storage: S3 vs local vs other?
- [ ] Email service: SendGrid vs AWS SES?
- [ ] Analytics: Google Analytics vs Mixpanel?
- [ ] Monitoring: Datadog vs New Relic?
- [ ] CDN: Cloudflare vs AWS CloudFront?
- [ ] Admin dashboard for CanchaYa staff?
- [ ] Dispute resolution system?
- [ ] Insurance/liability handling?

---

## Success Metrics (Phase 2)

- Players: Booking from discovery to confirmation in <10 seconds
- Facility owners: Add facility + 5 courts in <5 minutes
- API response times: <200ms for all endpoints
- Mobile app: Smooth 60fps animations, <3s load time
- Real-time: Availability updates within 2 seconds
- Uptime: 99.9% availability

---

## Risk Mitigation

| Risk | Impact | Mitigation |
|------|--------|-----------|
| Complex geolocation | High | PostGIS well-tested, start simple |
| Real-time scalability | High | Start with Socket.IO, scale with Redis |
| Payment integration later | Medium | Design API for easy payment module insertion |
| Social auth complexity | Medium | Use OAuth libraries (passport.js) |
| Facility owner adoption | High | Simple UX, quick setup, good support docs |
